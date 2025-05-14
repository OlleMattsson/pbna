import { config } from '@keystone-6/core';
import { lists } from './configs/schema';
import { withAuth, session } from './configs/auth';
import { WebSocketServer } from 'ws';
import { useServer as wsUseServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import { schemaExtensions } from './configs/schemaExtensions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';

import { pubsub } from './common/pubsub';

import { Socket } from 'net';
import type { IncomingMessage, Server as HttpServer } from 'http';


export default 
withAuth(
  config({
    server: {
      cors: { 
        origin: [
          'http://localhost:8080',
          'http://localhost:5173'
        ], 
        credentials: true 
      },
      extendHttpServer: (httpServer: HttpServer, context) => {
          

      }
    },
    db: {
      provider: 'postgresql',
      url: "postgres://pbna_pguser:pbna_pgpw@postgres/pbna_pgdb", 
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
    extendGraphqlSchema: schemaExtensions
  }
));
