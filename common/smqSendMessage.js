import { Producer } from 'redis-smq';

export function sendMessage(message, config) {
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