/*
    GRAPHQL SUBSCRIPTIONS Service

    Running on port 4000 as to not interfere with keystones 
    admin UI (which also uses websockets and needs to be left alone)

    Handles graphql subscriptions
*/

import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { execute, subscribe } from "graphql";
import * as PrismaModule from "@prisma/client";
import { session } from "../configs/auth";
import { getRedisPubSub } from "../helpers/pubsub";
import keystoneConfig from "../keystone";
import { initConfig, createSystem } from "@keystone-6/core/system"; // ← the key import!
import { getContext } from "@keystone-6/core/context";

async function main() {
  const schema = await initKeystoneSchema();
  const server = createServer();
  //const wss = new WebSocketServer({ noServer: true }); // ← important
  const wss = new WebSocketServer({ server }); // auto config from vecp prod

  useServer(
    {
      schema,
      execute,
      subscribe,
      context: getWSContext,
      keepAlive: 15000,
      onConnect: (ctx) => console.log("WS client connected"),
      onDisconnect: (ctx) => console.log("WS client disconnected"),
      onError: (ctx, err) => console.error("WS Error:", err),
    },
    wss
  );

  server.listen(4000, () => {
    console.log("🚀 WS subscription server running on port 4000");
  });
}

main().catch((err) => {
  console.error("Failed to initialize subscription server:", err);
  process.exit(1);
});

// Fully initialize Keystone
async function initKeystoneSchema() {
  const config = initConfig(keystoneConfig);
  const system = createSystem(config);
  return system.graphQLSchema;
}

/*
    Augment the keystone context used in graphql subscription resolvers
    with session data and redis based pubsub
*/
async function getWSContext(ctx) {
  const pubsub = getRedisPubSub();
  const baseCtx = await getContext(keystoneConfig, PrismaModule);
  const incoming = (ctx.extra as any).request as http.IncomingMessage; // the cookie we need is in the request

  baseCtx.req = incoming as any; //  Attach that request onto baseCtx so session.get() can find it
  baseCtx.res = {} as any; // (We don't have a real HTTP response here)

  // decode the session
  const sess = await session.get({ context: baseCtx });

  // use decoded session to verify that user exists
  // a sudo context is used to bypass acl to find the user
  let user = null;
  if (sess?.itemId) {
    user = await baseCtx.sudo().query.User.findOne({
      where: { id: sess.itemId },
      query: "id role organization { id }",
    });
  }

  if (sess && !user) {
    console.warn(
      "[getWSContext] Session user not found, closing connection",
      sess.itemId
    );
    throw new Error("Invalid session");
  }

  // create a new session object including user data
  const sessionWithData = sess ? { ...sess, data: user } : null;

  const ksCtx =
    sessionWithData && typeof (baseCtx as any).withSession === "function"
      ? baseCtx.withSession(sessionWithData as any)
      : baseCtx;

  (ksCtx as any).session = sessionWithData;
  (ksCtx as any).pubsub = pubsub;

  return ksCtx;
}
