/*

  Generic tool for setting the status of an Invoice resource in keystone.
  The status enums in the input schema reflects the statuses defined 
  for the Invoice resource

Input schema

{
  "type": "object",
  "required": [
    "invoiceId",
    "newStatus"
  ],
  "properties": {
    "invoiceId": {
      "enum": [
        "draft",
        "pending",
        "processing",
        "awaiting_verification",
        "verified",
        "failed"
      ],
      "type": "string"
    },
    "newStatus": {
      "type": "string"
    }
  }
}

output schema

{
  "type": "string"
}

*/

import { agentRunner } from "../agentRunner";

export async function setInvoiceStatus({
  agent,
  input,
  context,
  agentOutputId,
}) {
  const executor = async ({ input, context }) => {
    const { invoiceId, newStatus } = input;

    console.log(`[setInvoiceStatus] set invoice ${invoiceId} to ${newStatus}`);

    await context.db.Invoice.updateOne({
      where: { id: invoiceId },
      data: { status: newStatus },
    });

    return newStatus;
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
