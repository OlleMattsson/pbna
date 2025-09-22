/*


*/

import { agentRunner } from "../agentRunner";

export async function createInvoice({ agent, input, context, agentOutputId }) {
  const executor = ({ context, input }) => {
    const { invoiceData, invoiceDirection, invoiceId } = input;

    const i = invoiceData.parsed_output_text;

    console.log("CREATING INVOICE");

    console.log(i, invoiceDirection.parsed_output_text.direction);

    const newInvoice = context.db.Invoice.updateOne({
      where: { id: invoiceId },
      data: {
        isGenerated: true,
        type:
          invoiceDirection.parsed_output_text.direction === "outgoing"
            ? "outgoing"
            : "incoming",
        issue_date: i.dates.issue_date,
        due_date: i.dates.due_date,
        subtotal_ex_vat_amount: i.amounts.subtotal_ex_vat.toString() || "",
        vat_amount: i.amounts.vat_amount_total.toString() || "",
        total_amount: i.amounts.total_gross.toString() || "",
        vat_rate: i.amounts.vat_breakdown[0].rate_percent.toString() || "",
      },
    });

    // output must conform to the output schema
    return newInvoice;
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
