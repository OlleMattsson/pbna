import { QueueManager, Message, Producer } from 'redis-smq';
import {config, queueNames} from "../common/redis-smq-config"


// The idea is that the servies make the queues...
/*
QueueManager.createInstance(config, (err, queueManager) => {
    if (err) console.log(err);
    else {
      queueManager.queue.create(queueNames.tesseract, false, (err) => null); // swallow the error
      queueManager.queue.create(queueNames.llamaDataExtraction, false, (err) => null); // swallow the error
    }
})
*/
  
export function smqRun(message, config) {
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