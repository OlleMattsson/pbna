import Tesseract from 'tesseract.js';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { sendMessage } from './common/smqSendMessage.js';
import { Consumer, QueueManager, Message } from 'redis-smq';
import {config, queueNames} from "./common/redis-smq-config.js"
import util from "util"

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

export function ocrService(opts) {

    const {imagePath, language} = opts;
    const basePath = `http://keystone:3000/files/`

    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            basePath + imagePath,
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

  let ocrServiceResponse;
  let _ocrData;

  try {
    ocrServiceResponse = await ocrService({
      imagePath: imagePath,
      language
    });

    console.log(`\n\nOCR Service: \n${ocrServiceResponse}`)

    // prepare OCR data for keystone document field
    _ocrData = JSON.stringify(ocrServiceResponse).split("\\n").map(text => ({
      type: 'paragraph',
      children: [{ 
        text
      }]   
    }))

    //console.log(`\n\nOCR Service: \n${util.inspect(ocrData, {depth:null, showHidden: false, colors: true})}`)

  } catch(error) {
    console.log(error)
  }  


    const variables = {
      where: {
        id: attachmentId
      },
      data: {
        ocrData: _ocrData,     
      }
    }
    console.log(`\n\variables: \n${util.inspect(variables, {depth:null, showHidden: false, colors: true})}`)

    gqlApi.mutate({
      mutation: UPDATE_OCR_DATA,
      variables
    }).then(response => {
      console.log('Mutation response:', response);
    }).catch(error => {
      console.error('Error executing mutation:', error);
    });

  // send message to llama to initiate data extraction
  try {
    const message = new Message();
    message
      .setBody({
        attachmentId: attachmentId,
        ocrData: ocrServiceResponse
      })
      .setTTL(1000 * 60) // in millis
      .setQueue(queueNames.llamaDataExtraction); 

    sendMessage(message, config)

  } catch (err) {
    throw new Error(`ocrData Service failed with error: ${err}`)
  }
}

