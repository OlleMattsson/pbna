import Tesseract from 'tesseract.js';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { Consumer, QueueManager, Message } from 'redis-smq';
import { sendMessage } from '../common/smqSendMessage.js';
import {config, queueNames} from "../common/redis-smq-config.js"

/**
 * REDIS
*/

QueueManager.createInstance(config, (err, queueManager) => {
  if (err) console.log(err);
  else queueManager.queue.create(queueNames.tesseract, false, (err) => console.log(err));
})

const consumer = new Consumer(config);

consumer.run((err, status) => {
  if (err) console.error(err);
  if (status) console.log(`${queueNames.tesseract} queue ready`);
});

const messageHandler = async (msg, cb) => {
    const msgBody = msg.getBody();
    await runOCR(msgBody)
    cb(); // acknowledging the message
};

consumer.consume(queueNames.tesseract, messageHandler, (err) => {
  if (err) console.error(err);
});

/**
 * GraphQL
 */

const gqlApi = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://keystone:3000/api/graphql'
})

const UPDATE_OCR_DATA = gql`
mutation Mutation($where: AttachmentWhereUniqueInput!, $data: AttachmentUpdateInput!) {
    updateAttachment(where: $where, data: $data) {
      id
    }
  }
`;

/*
type ocrServiceOpts = {
    imagePath: string,
    language: string
}
*/

export function tesseract(opts) {

    const {imagePath, language} = opts;
    const basePath = `http://keystone:3000/files/`

    return new Promise(async (resolve, reject) => {
      await Tesseract.setLogging(false)
      Tesseract.recognize(
          basePath + imagePath,
          language,
        ).then(({ data: { text } }) => {
          resolve(text)
        }).catch(err => {
          console.log("CAUGHT!")
          console.log(err)
          reject(err)
        })
    })
}

/**
 * Tesseract
 */
async function runOCR(params) {
  const {attachmentId, imagePath, language} = params;

  let tesseractResponse;

  // run the tesseract OCR engine
  try {
    tesseractResponse = await tesseract({
      imagePath: imagePath,
      language
    });
  } catch(error) {
    console.log(error)

  }  


  // prepare OCR data for keystone document field
  const ocrData = JSON.stringify(tesseractResponse).split("\\n").map(text => ({
    type: 'paragraph',
    children: [{ 
      text
    }]   
  }))

  // store OCR results in keystone
  try {
    await gqlApi.mutate({
      mutation: UPDATE_OCR_DATA,
      variables: {
        where: {
          id: attachmentId
        },
        data: {
          ocrData,
          ocrStatus: "success"
        }
      }
    })
  } catch (err) {
    console.error('Error executing mutation:', err);
  }


  // send message to llama to initiate data extraction
  try {
    const message = new Message();
    message
      .setBody({
        attachmentId: attachmentId,
        ocrData: tesseractResponse,
      })
      .setTTL(1000 * 60 * 60) // in millis
      .setQueue(queueNames.llamaDataExtraction); 

    sendMessage(message, config)

  } catch (err) {
    throw new Error(`ocrData Service failed with error: ${err}`)
  }
}

