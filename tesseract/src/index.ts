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




/**
 * Tesseract
 */
async function runOCR({imagePath, language, agentId}) {
  try { 

    console.log("[runOCR]", imagePath, "agent:", agentId)

    const channel = `agent-result:${agentId}`;
    const pubsub = getRedisPubSub()
    const basePath = `http://keystone:3000/files/`  
    const imageUrl = `${basePath}${imagePath}`

    // sanity check the image, because if we feed an url that produces a 404
    // tesseract crashes somewhere deep where it can't be caught (unless someone
    // has a bright idea).

    const imageExists = await checkImageExists(imageUrl);

    if (!imageExists) {
      throw new Error(`Image not found: ${imagePath}`);
    }
    
    // run the tesseract OCR engine
    const tesseractResponse = await tesseract({
        imageUrl,
        language
      });

    if (!tesseractResponse) {
      throw new Error("no tesseract response")
    }

    // prepare OCR data 
    const ocrData = JSON.stringify(tesseractResponse).split("\\n").map(text => ({
      type: 'paragraph',
      children: [{ 
        text
      }]   
    }))

    console.log("ok")

    // emit event
    await pubsub.redisPublisher.publish(channel, JSON.stringify({ ocrData }));

  } catch (e) {
    console.log(e)
  }

}

async function checkImageExists(imageUrl: string): Promise<boolean> {
  try {
    const res = await fetch(imageUrl, { method: 'HEAD' });
    const contentType = res.headers.get('content-type');
    const contentLength = Number(res.headers.get('content-length') || 0);
    const isImage = contentType === 'application/octet-stream';  // yeah - pretty weird, but if its text/html then the image didn't exist
    const isRealFile = isImage && contentLength > 0;
    
    if (!isRealFile) {
      throw new Error(`[checkImageExists]${imageUrl} had wrong content type: ${contentType}`);
    }
    
    return true
  } catch(e) {
    console.log(e)
    return false;
  }
}

async function tesseract({imageUrl, language}) {
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