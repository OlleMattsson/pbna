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
        
        // Remove any previously-registered upgrade listeners
        httpServer.removeAllListeners('upgrade');

        httpServer.on('upgrade', (req, socket, head) => {
          console.log('[upgrade] incoming upgrade for', req.url);
          if (req.url === '/api/graphql/subscriptions') {
            
            console.log('[upgrade] grabbing socket for GraphQL-WS');
            socket.setTimeout(0);

            wss.handleUpgrade(req, socket, head, ws => {
              console.log('[upgrade] upgraded to WebSocket');
              wss.emit('connection', ws, req);
            });
          }
        });

        console.log("sanity check 123")

        httpServer.keepAliveTimeout = 120_000;  // 2 min idle before Node kills it
        httpServer.headersTimeout   = 125_000;  // must be > keepAliveTimeout

        const wss = new WebSocketServer({
          noServer: true
        });

        const cleanup = wsUseServer({
          schema:        context.graphql.schema,
          execute,
          subscribe,
          context:      () => ({ ...context, pubsub }),
          onConnect:    () => console.log('[graphql-ws] client CONNECT'),
          onSubscribe:  (ctx, msg) => console.log('[graphql-ws] subscribe', msg),
          onNext:       (ctx, msg, args) => console.log('[graphql-ws] next', msg),
          onError:      (ctx, err) => console.error('[graphql-ws] error', err),
          onComplete:   (ctx, msg) => console.log('[graphql-ws] complete', msg),
          onDisconnect: (ctx, code, reason) => console.log('[graphql-ws] disconnect', { code, reason }),
          keepAlive:    15_000 as any,
        } as any, wss);



        // 5) Clean up on server shutdown (if you support it)
        httpServer.on('close', () => {
          console.log("httpserver onClose")
          return cleanup.dispose()
        });
        



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
