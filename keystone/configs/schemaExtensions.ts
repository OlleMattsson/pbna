import { mergeSchemas } from '@graphql-tools/schema';
import { config as dotenv } from 'dotenv';

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
                subscribe: (_root, _args, context) => {
                    try {
                        return context.pubsub.asyncIterableIterator('ENTRY_CHANGED')
                      } catch (err) {
                        console.error('Failed in subscribe resolver', err);
                        throw err; // or return EMPTY async iterator
                      }
                } 
            },
        },
    }
})

