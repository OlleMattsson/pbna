/*
    Create Invoice Verification



*/

import { agentRunner } from "../agentRunner";

export async function createInvoiceVerification({
  agent,
  input,
  context,
  agentOutputId,
}) {
  const executor = async ({ input, context }) => {
    const { invoiceId } = input;

    console.log(`Running Create Invoice Verification for invoice ${invoiceId}`);

    try {
      const invoiceVerification =
        await context.query.InvoiceVerification.createOne({
          data: {
            invoice: { connect: { id: invoiceId } },
            agentOutput: { connect: { id: agentOutputId } },
          },
          query: "id",
        });

      const invoiceVerificationId = invoiceVerification.id;

      console.log("new invoice Verification Id: ", invoiceVerificationId);

      // update the invoices reference
      await context.db.Invoice.updateOne({
        where: { id: invoiceId },
        data: {
          verification: { connect: { id: invoiceVerificationId } },
        },
      });

      return invoiceVerificationId;
    } catch (e) {
      console.log(e);
    }

    return false;
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
