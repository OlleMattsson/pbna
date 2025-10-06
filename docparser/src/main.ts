import { Consumer, QueueManager, Message } from "redis-smq";
import { sendMessage } from "../common/smqSendMessage";
import { config, queueNames } from "../common/redis-smq-config";
import { getRedisPubSub } from "../common/redispubsub";
import { DocumentParser } from "./DocumentParser";

function main() {
  try {
    QueueManager.createInstance(config, (err, queueManager) => {
      if (err) console.log(err);
      else
        queueManager.queue.create(queueNames.docParser, false, (err) => null);
    });

    const consumer = new Consumer(config);

    consumer.run((err, status) => {
      if (err) console.error(err);
      if (status) console.log(`${queueNames.docParser} queue ready`);
    });

    consumer.consume(queueNames.docParser, messageHandler, (err) => {
      if (err) console.error(err);
    });
  } catch (error) {
    console.log("main() error:", error);
  }
}

const messageHandler = async (msg, cb) => {
  const msgBody = msg.getBody();

  // parse the doc!
  const docparser = new DocumentParser({ logger: console.log });
  const res = await docparser.parse(msgBody.file);

  console.log(res.method, res.meta, res.pages.length);
  console.log(res.combinedText);

  cb(); // acknowledging the message
};

main();
