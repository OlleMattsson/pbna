import { Message } from 'redis-smq';
import {config, queueNames} from "../common/redis-smq-config"
import { smqRun } from '../helpers/smq'
import { getRedisPubSub } from '../common/redispubsub';

const pubsub = getRedisPubSub()
const subscriber = pubsub.redisSubscriber


export async function runAgent(agent, input, context, agentOutputId) {
    switch (agent.type) {

      case 'tool':
        return runToolAgent(agent, input, context, agentOutputId);

      default:
        throw new Error(`Unsupported agent type: ${agent.type}`);
    }
  }

async function runToolAgent(agent, input, context, agentOutputId) {
    switch(agent.functionName) {
        case "ocrTesseract": 
            return runOcrTesseract(agent, input, context, agentOutputId)
        case "testAgent":
            return testAgent(agent, input, context, agentOutputId)    
        default:
            throw new Error(`Unknown tool agent function: ${agent.function}`);
    }
}


async function testAgent(agent, input, context, agentOutputId) {ö
    console.log("[testAgent] <<<<< BROOO! >>>>>", agent, input)

    await context.db.AgentOutput.updateOne({
        where: {id: agentOutputId},
        data: {
            output: {testAgentId: agent.id},
            status: 'completed',
        }
      });
    return
}


// ok note how there's no contextMap here anymore, 
// only the interpolated inputs
async function runOcrTesseract(agent, input, context, agentOutputId) {

    const {language, imagePath} = input

    try {
        // set up listener
        const resultPromise = waitForAgentResult(agent.id)
        
        // tesseract ocr
        const ocrmsg = new Message();
        ocrmsg
            .setBody({
                imagePath: imagePath,
                language,
                agentId: agent.id
            })
            .setTTL(1000 * 60) // in millis
            .setQueue(queueNames.tesseract); 
        
        // send message
        smqRun(ocrmsg, config)

        await resultPromise

        await context.db.AgentOutput.updateOne({
            where: {id: agentOutputId},
            data: {
                output: resultPromise,
                status: 'completed',
            }
          });

        return

    } catch (err) {
        console.log(err)
    }
}

  export async function waitForAgentResult(agentOutputId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const channel = `agent-result:${agentOutputId}`;
  
      const handler = (msgChannel: string, message: string) => {
        if (msgChannel !== channel) return;
  
        console.log(`[waitForAgentResut] received message on channel ${channel}`)

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
      }, 60_000); // 60s timeout
    });
  }

