// keystone/eventListeners.ts
import { initAppContext } from "../context";
import { getRedisPubSub } from "../pubsub";
import { runOrchestrator } from "../helpers/orchestrator";

const pubsub = getRedisPubSub();

export const INVOICE_UPDATE_STATUS = "invoice:update:status";
export const INVOICE_UPDATE_STATUS_VERIFIED = "invoice:update:status:verified";

/*

  Invoice Status is set to Verified

*/

pubsub.subscribe(INVOICE_UPDATE_STATUS_VERIFIED, async ({ invoiceId }) => {
  const ctx = await initAppContext();

  // retrieve all orchestrators that are listening for this event
  const orchestrators = await ctx.query.Orchestrator.findMany({
    where: {
      triggerEvent: { equals: INVOICE_UPDATE_STATUS_VERIFIED },
      isEnabled: { equals: true },
    },
    query: `id`,
  });

  console.log("orchestrators found", orchestrators);

  // run orchestrators
  for (const orchestrator of orchestrators) {
    await runOrchestrator({
      context: ctx,
      orchestratorId: orchestrator.id,
      contextMap: { invoiceId },
    });
  }
});

/* 
  
  Invoice Status was updated

*/

pubsub.subscribe(INVOICE_UPDATE_STATUS, async ({ invoiceId }) => {
  const ctx = await initAppContext();

  console.log(`invoice ${invoiceId} was updated`);
});
