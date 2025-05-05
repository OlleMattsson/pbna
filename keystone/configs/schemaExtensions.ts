import { mergeSchemas } from '@graphql-tools/schema';
import { config as dotenv } from 'dotenv';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();


dotenv({ path: './common/.env' });

export const schemaExtensions = schema => mergeSchemas({
    schemas: [schema],
    typeDefs: `
        type Subscription {
            entryChanged: Entry
        }
    `,
    resolvers:{
        Subscription: {
            entryChanged: {
              subscribe: () => pubsub.asyncIterator('ENTRY_CHANGED'),
            },
          },
    }
})

