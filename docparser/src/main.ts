/*
  DocParser is a microservice that can receive pdfs or images and returns text.
  This tool acts as the glue between the keystone Orchestrator and DocParser.

  It is possible to interact with DocParser through a redisSMQ queue. 

*/

import { Consumer, QueueManager, Message } from "redis-smq";
import { sendMessage } from "../common/smqSendMessage";
import { config, queueNames } from "../common/redis-smq-config";
import { getRedisPubSub } from "../common/redispubsub";
import { DocumentParser } from "./DocumentParser";

// Init the redisSMQ queue and register a consumer
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

  // Redis PubSub is used to send the results back to the calling agent tool
  const channel = `agent-result:${msgBody.agentId}`;
  const pubsub = getRedisPubSub();

  // parse the doc!
  const docparser = new DocumentParser();
  const res = await docparser.parse(`./files/${msgBody.file}`);

  // send back the result
  await pubsub.redisPublisher.publish(channel, JSON.stringify({ ...res }));

  cb(); // acknowledging the message
};

main();

process.on("unhandledRejection", (e) => {
  console.error(e);
  process.exit(1);
});
process.on("uncaughtException", (e) => {
  console.error(e);
  process.exit(1);
});
