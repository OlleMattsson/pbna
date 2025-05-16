import { config } from '@keystone-6/core';
import lists from './configs/lists';
import { withAuth, session } from './configs/auth';
import { schemaExtensions } from './configs/schemaExtensions';
import { getRedisPubSub } from './helpers/pubsub';

const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, PORT } = process.env


export default 
withAuth(
  config({
    server: {
      cors: { 
        origin: [
          'http://localhost:5174', // vite running locally
          'https://localhost'      // ideally - if we can get vites stupid hmr thing to work
        ], 
        credentials: true 
      }, 
    },
    db: {
      provider: 'postgresql',
      url: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres/${POSTGRES_DB}`, 
      enableLogging: ['warn', 'error'],
      idField: { kind: 'uuid' }
    },
    lists,
    session,
    storage: {
      journal_item_files: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `http://localhost:${process.env.PORT}/files${path}`,
        serverRoute: {
          path: '/files',
        },
        storagePath: 'public/files'
      }
    },
    extendGraphqlSchema: schemaExtensions,
    graphql: {
      // inject redis based pubsub into apollo
      // allows event passing between keystone instances
      apolloConfig: {
        context: async ({ req, res, context }) => ({
          ...context,    
          pubsub: getRedisPubSub()        
        }),
        introspection: true    
      },
    },
  }
));
