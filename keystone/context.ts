// keystone/context.ts
import { getContext as _getContext } from "@keystone-6/core/context";
import type { KeystoneContext } from "@keystone-6/core/types";
import * as PrismaModule from "@prisma/client";
import keystoneConfig from "./keystone";
import { getRedisPubSub } from "./pubsub";

export type AppContext = KeystoneContext & {
  pubsub: ReturnType<typeof getRedisPubSub>;
};

export async function initAppContext(): Promise<AppContext> {
  // 1) Bootstrap the raw context
  const raw = _getContext(keystoneConfig, PrismaModule);
  // 2) Elevate to sudo
  const sudoCtx = raw.sudo();
  // 3) Inject pubsub
  sudoCtx.pubsub = getRedisPubSub();
  return sudoCtx;
}

/**
 * augment an existing context, eg inside hooks
 */
export function augmentContext(ctx: KeystoneContext): AppContext {
  const sudoCtx = ctx.sudo();
  sudoCtx.pubsub = getRedisPubSub();
  return sudoCtx;
}
