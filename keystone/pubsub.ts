/*
  A redis based pubsub for graphql subscriptions

  BONUS: we can highjack the "raw" publiser and subscriber
  from context.pubsub to send any pubsub messages we want =)

  const augmentedCtx = augmentContext(context) 
  caugmentedCtxtext.pubsub.redisPublisher.publish("YAY")


*/
import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { config as dotenv } from 'dotenv';

// Load your .env (so process.env.REDIS_HOST/REDIS_PORT are populated)
dotenv({ path: './common/.env' });

let pubsubInstance: PubSub | RedisPubSub;

/**
 * Returns a singleton PubSub:
 * - In build/CLI (no REDIS_HOST/PORT): a simple in-memory PubSub
 * - At runtime (with REDIS_HOST & REDIS_PORT): a RedisPubSub with two ioredis clients
 */
export function getRedisPubSub() {
  if (!pubsubInstance) {
    const { REDIS_HOST, REDIS_PORT } = process.env;
    if (REDIS_HOST && REDIS_PORT) {
      const port = parseInt(REDIS_PORT, 10);
      const opts = {
        host: REDIS_HOST,
        port,
        retryStrategy: (times: number) => Math.min(times * 50, 2000),
      };

      const publisher = new Redis(opts);
      publisher.on('error', (err) =>
        console.error('[pubsub][publisher] Redis error', err)
      );

      const subscriber = new Redis(opts);
      subscriber.on('error', (err) =>
        console.error('[pubsub][subscriber] Redis error', err)
      );

      pubsubInstance = new RedisPubSub({ publisher, subscriber });
      pubsubInstance.redisPublisher = publisher;     // used when needing the "real" redis publisher
      pubsubInstance.redisSubscriber = subscriber;   // used when needing the "real" redis subsriber
    } else {
      // No Redis config available: use in-memory PubSub for build/CLI
      pubsubInstance = new PubSub();
    }
  }
  return pubsubInstance;
}