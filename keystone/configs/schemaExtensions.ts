import { mergeSchemas } from '@graphql-tools/schema';
import { config as dotenv } from 'dotenv';
import { 
    entryChanged, 
    subscriptionTypeDefs, 
    verifyInvitation, 
    mutationTypeDefs ,
    onInvoice
} from './schemaExtensions/index'

dotenv({ path: './common/.env', quiet: true });

export const schemaExtensions = schema => mergeSchemas({
    schemas: [schema],
    typeDefs: `
        ${mutationTypeDefs}
        ${subscriptionTypeDefs}
        `,
    resolvers:{
        Subscription: {
            entryChanged,
            onInvoice
        },
        Mutation: {
            verifyInvitation
        }
    }
})
