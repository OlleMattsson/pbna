import Tesseract from 'tesseract.js';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { sendMessage } from './common/smqSendMessage.js';
import { Consumer, QueueManager } from 'redis-smq';
import {config, queueNames} from "./common/redis-smq-config.js"

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
  if (status) console.log(`${queueName.tesseract} service at your service`);
});

const messageHandler = async (msg, cb) => {
    console.log(msg)
    const msgBody = msg.getBody();
    await runTesseract(msgBody)
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
    uri: 'http://localhost:3000/api/graphql'
})

const UPDATE_OCR_DATA = gql`
mutation Mutation($where: AttachmentWhereUniqueInput!, $data: AttachmentUpdateInput!) {
    updateAttachment(where: $where, data: $data) {
      ocrData
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

export function ocrService(opts) {

    const {imagePath, language} = opts;

    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            imagePath,
            language,
            { logger: m => console.log(m) }
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
async function runTesseract(params) {
  const {attachmentId, imagePath, language} = params;

  try {
    const ocrServiceResponse = await ocrService({
      imagePath: imagePath,
      language
    });

  } catch (err) {
    console.error('OCR service error', error);

  }



  // store ocr result in keystone
  try {
    // prepare OCR data for keystone document field
    const ocrData = JSON.stringify(ocrServiceResponse).split("\\n").map(text => ({
      type: 'paragraph',
      children: [{ 
        text
      }]   
    }))

    const res = await gqlApi.mutate({
      mutation: UPDATE_OCR_DATA,
      variables: {
        where: {
          id: attachmentId
        },
        data: {
          ocrData
        }
      }
    })

    console.log('Mutation response:', res)

  } catch (error) {
    console.error('Error executing mutation:', error);
  }

  // send message to llama to initiate data extraction
  try {
    const message = new Message();
    message
      .setBody({
        attachmentId: id,
        ocrData: ocrServiceResponse
      })
      .setTTL(3600000) // in millis
      .setQueue(queueNames.llamaDataExtraction); 

    sendMessage(message, config)

  } catch (err) {
    throw new Error(`ocrData Service failed with error: ${err}`)
  }
}

