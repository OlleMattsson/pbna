import { Message } from 'redis-smq';
import {config, queueNames} from "../common/redis-smq-config"
import { smqRun } from '../helpers/smq'
import { getRedisPubSub } from '../common/redispubsub';

const pubsub = getRedisPubSub()
const subscriber = pubsub.redisSubscriber


export async function runAgent(agent, input) {
    switch (agent.type) {

      case 'tool':
        return runToolAgent(agent, input);

      default:
        throw new Error(`Unsupported agent type: ${agent.type}`);
    }
  }

async function runToolAgent(agent, input) {

    console.log("agent", agent)
    console.log("input", input)

    switch(agent.functionName) {
        case "ocrTesseract": 
            return runOcrTesseract(agent, input)
        default:
            throw new Error(`Unknown tool agent function: ${agent.function}`);
    }
  }

  async function runOcrTesseract(agent, attachment) {
    try {
        // set up listener
        const resultPromise = waitForAgentResult(agent.id)
        
        // tesseract ocr
        const ocrmsg = new Message();
        ocrmsg
            .setBody({
                attachmentId: attachment.id,
                imagePath: attachment.fileName,
                language: "fin",
                agentId: agent.id
            })
            .setTTL(1000 * 60) // in millis
            .setQueue(queueNames.tesseract); 
        
        // send message
        smqRun(ocrmsg, config)

        await resultPromise
        console.log(resultPromise)
        return resultPromise
    
      } catch (err) {
        console.log(err)
      }
  }

  export async function waitForAgentResult(agentOutputId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const channel = `agent-result:${agentOutputId}`;
  
      const handler = (msgChannel: string, message: string) => {
        if (msgChannel !== channel) return;
  
        // Clean up the listener
        subscriber.unsubscribe(channel);
        subscriber.removeListener('message', handler);
  
        try {
          const payload = JSON.parse(message) || "" 
          resolve(payload);
        } catch (err) {
          reject(err);
        }
      };
  
      subscriber.subscribe(channel);
      subscriber.on('message', handler);
  
      // Timeout to reject if no result arrives
      setTimeout(() => {
        subscriber.unsubscribe(channel);
        subscriber.removeListener('message', handler);
        reject(new Error('Timeout waiting for OCR result'));
      }, 10000); // 10s timeout
    });
  }

