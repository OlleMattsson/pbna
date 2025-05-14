import { mergeSchemas } from '@graphql-tools/schema';
import { config as dotenv } from 'dotenv';
import { entryChanged, subscriptionTypeDefs, verifyInvitation, mutationTypeDefs } from './schemaExtensions/index'

dotenv({ path: './common/.env' });

export const schemaExtensions = schema => mergeSchemas({
    schemas: [schema],
    typeDefs: `
        ${mutationTypeDefs}
        ${subscriptionTypeDefs}
        `,
    resolvers:{
        Subscription: {
            entryChanged
        },
        Mutation: {
            verifyInvitation
        }
    }
})