/*

  Set invoice type (incoming / outgoing)
  based on inferred directoindirect

*/

import { agentRunner } from "../agentRunner";

export async function setInvoiceType({ agent, input, context, agentOutputId }) {
  const executor = async ({ input, context }) => {
    const { invoiceId, direction } = input;

    console.log(
      `[setInvoiceType] set invoice ${invoiceId} type to ${direction}`
    );

    await context.db.Invoice.updateOne({
      where: { id: invoiceId },
      data: { type: direction },
    });

    return direction;
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
