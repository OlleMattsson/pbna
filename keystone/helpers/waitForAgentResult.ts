
import { getRedisPubSub } from '../common/redispubsub';

const pubsub = getRedisPubSub()
const subscriber = pubsub.redisSubscriber

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
