import Tesseract from 'tesseract.js';
import { Consumer, QueueManager, Message } from 'redis-smq';
import { sendMessage } from '../common/smqSendMessage';
import {config, queueNames} from "../common/redis-smq-config"
import {getRedisPubSub} from '../common/redispubsub'

/**
 * REDIS
*/

function main() {
  try{

    QueueManager.createInstance(config, (err, queueManager) => {
      if (err) console.log(err);
      else queueManager.queue.create(queueNames.tesseract, false, (err) => null);
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

  } catch (error) {
    console.log("Main program:", error)
  }
}

main()


async function tesseract(opts) {

    const {imagePath, language} = opts;
    const basePath = `http://keystone:3000/files/`

    const imageUrl = `${basePath}${imagePath}`

    console.log("INSIDE TESSERACT", language, imageUrl)

    const exists = await checkImageExists(imageUrl);

    if (!exists) {
      throw new Error(`Image not found: ${imageUrl}`);
    }

    return new Promise(async (resolve, reject) => {
      try {
        await Tesseract.setLogging(false)

        const result = await Tesseract.recognize(
          imageUrl,
          language,
        )

        resolve(result.data.text)

      } catch (err) {
        console.log("Tesseract ocr error", err)
        reject(err)
      }
    })
}

/**
 * Tesseract
 */
async function runOCR(params) {
  const {attachmentId, imagePath, language, agentId} = params;

  const channel = `agent-result:${agentId}`;
  console.log("channel", channel)

  let tesseractResponse;

  console.log("imagePath", imagePath)

  const pubsub = getRedisPubSub()



  // run the tesseract OCR engine
  try {
    tesseractResponse = await tesseract({
      imagePath: imagePath,
      language
    });
  } catch(error) {
    console.log("Tesseract error", error)
  }  

  console.log("TESSERACT RESPONSE", tesseractResponse)

  if (!tesseractResponse) {
    // throwing here exits the program
    // throw new Error("no tesseract response")
    console.log("no tesseract response")
    return
  }

  // prepare OCR data for keystone document field
  const ocrData = JSON.stringify(tesseractResponse).split("\\n").map(text => ({
    type: 'paragraph',
    children: [{ 
      text
    }]   
  }))

  // publish an event to let the orchestrator in keystone know we have some results
  await pubsub.redisPublisher.publish(channel, JSON.stringify({ data: "yayyy" }));

}

async function checkImageExists(url: string): Promise<boolean> {
  console.log("checking image", url)
  try {
    const res = await fetch(url, { method: 'HEAD' });

    const contentType = res.headers.get('content-type');
    const contentLength = Number(res.headers.get('content-length') || 0);
    
    const isImage = contentType?.startsWith('image/');
    const isRealFile = isImage && contentLength > 0;

    if (!isRealFile) {
      throw new Error(`Image at ${imageUrl} is not valid or missing.`);
    }
    
    return true
  } catch(e) {
    console.log("no iamge found!")
    return false;
  }
}