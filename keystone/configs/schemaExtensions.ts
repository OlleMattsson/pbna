import { mergeSchemas } from '@graphql-tools/schema';
import { config as dotenv } from 'dotenv';
import { entryChanged, subscriptionTypeDefs } from './schemaExtensions/index'

dotenv({ path: './common/.env' });

export const schemaExtensions = schema => mergeSchemas({
    schemas: [schema],
    typeDefs: `${subscriptionTypeDefs}`,
    resolvers:{
        Subscription: {
            entryChanged: entryChanged
        },
    }
})