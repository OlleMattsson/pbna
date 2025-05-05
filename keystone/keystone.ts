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



export const pubsub = new PubSub();


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
      extendHttpServer: (httpServer, context) => {

        httpServer.keepAliveTimeout = 120_000;  // 2 min idle before Node kills it
        httpServer.headersTimeout   = 125_000;  // must be > keepAliveTimeout

        const wss = new WebSocketServer({
          noServer: true
        });

        wss.on('connection', (ws) => {
          const timer = setInterval(() => ws.ping(), 12_000);
          ws.on('close', () => clearInterval(timer));
        });

        wsUseServer(
          {
            schema: context.graphql.schema,
            execute,
            subscribe,
            context: async (ctx, msg, args) => {
              // you can inspect ctx.connectionParams here for auth tokens
              return { ...context, pubsub };
            },
            onConnect: (ctx) => {
              console.log('Subscription client connected');
            },
            onDisconnect: (ctx, code, reason) => {
              console.log('Subscription client disconnected', { code, reason });
            },
            onError: (err) => {
              console.error('Subscription error', err);
            },
          },
          wss
        );

        // 3) Intercept ONLY the subscription URL upgrades
      httpServer.on('upgrade', (req, socket, head) => {

        console.log("on upgrade")

        if (req.url === '/api/graphql/subscriptions') {
          // take over the socket before HTTP can touch it
          console.log("req url: /api/graphql/subscriptions")
          wss.handleUpgrade(req, socket, head, ws => {
            wss.emit('connection', ws, req);
          });
        }
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
