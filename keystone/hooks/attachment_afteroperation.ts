import {ocrService} from '../tesseract'
import util from 'util'
import { QueueManager, Message, Producer } from 'redis-smq';
import {config, queueNames} from "../common/redis-smq-config.js"

/**
 * REDIS SETUP
 */


QueueManager.createInstance(config, (err, queueManager) => {
  if (err) console.log(err);
  else {
    queueManager.queue.create(queueNames.tesseract, false, (err) => console.log(err));
    queueManager.queue.create(queueNames.llamaDataExtraction, false, (err) => console.log(err));
  }
})

function smqRun(message, config) {
  const producer = new Producer(config);
  producer.run((err) => {
      if (err) throw err;
      message.getId() // null
      producer.produce(message, (err) => {
          if (err) console.log(err);
          else {
              const msgId = message.getId(); // string
              console.log('Successfully produced. Message ID is ', msgId);
          }
      });
  })
}

export async function attachmentAfterOperation ({ operation, item, context }) {

    // add validation to check that file exists :D
    console.log(item)

    if (operation === 'create') {

      const { file_filename, id  } = item;

      const file_extension = file_filename?.split('.')[1]

      if (file_extension === "pdf") {
        console.log("PDF not supported")
        return
      }

      try {

        /*
        const ocrServiceResponse = await ocrService({
          imagePath: `http://localhost:3000/files/${file_filename}`,
          language: "fin"
        }) as string
        */

        // tesseract ocr
        const ocrmsg = new Message();
        ocrmsg
            .setBody({
                attachmentId: id,
                imagePath: file_filename,
                language: "fin"
            })
            .setTTL(1000 * 60) // in millis
            .setQueue(queueNames.tesseract); 
        
        smqRun(ocrmsg, config)
    
        
        /*    
        await context.db.Attachment.updateOne({
          where: { id },
          data: { 
            // store each line as a separate paragraph in order to make result more readable for humans and machines
            ocrData: JSON.stringify(ocrServiceResponse).split("\\n").map(text => ({
              type: 'paragraph',
              children: [{ 
                text
              }]   
            }))
          }
        });
        */

        // llama data extraction
        /*
        const message = new Message();
        message
            .setBody({
              operation: 'extract', 
              attachmentId: id,
              ocrData: ocrServiceResponse
            })
            .setTTL(3600000) // in millis
            .setQueue(queueNames.llamaDataExtraction); 

        smqRun(message, config)
        */

      } catch (err) {

        console.log("afterOperation catch")
        throw new Error(`ocrData Service failed with error: ${err}`)

      }
      
    }     

  }      