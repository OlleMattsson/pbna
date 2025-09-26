/*

    Create entry from inferred invoice data

*/
import { agentRunner } from "../agentRunner";

export const createEntry = async ({ agent, input, context, agentOutputId }) => {
  const executor = async ({ agent, input, context }) => {
    console.log("Running Create Entries Tool");

    const { invoiceId, entryData } = input;

    console.log(invoiceId, entryData, context.session.data);

    const user = await context.query.User.findOne({
      where: { id: context.session.data.id }, // wrong session id - we're running this as admin, not as the user
      query: "organization {id}",
    });

    console.log("user: ", user);

    // retrieve accountingPeriod
    const accountingPeriod = await context.query.AccountingPeriod.findMany({
      where: {
        AND: [
          {
            owner: {
              id: {
                equals: user.organization.id,
              },
            },
            isActive: {
              equals: true,
            },
          },
        ],
      },
      query: "id",
    });

    console.log("accountingPeriod: ", accountingPeriod);

    // retrieve account ids
    const accounts = await context.query.Account.findMany({
      query: "id account",
      where: {
        OR: invoiceData.lines.map((item) => {
          return {
            account: {
              equals: Number.parseInt(item.account_no, 10),
            },
          };
        }),
      },
    });

    console.log("accounts: ", accounts);

    // retrieve invoice attachment
    const invoice = await context.query.Invoice.findOne({
      where: { id: invoiceId },
      query: "attachment {id}",
    });

    // props shared between entry and lineitems
    const commonProps = {
      createdBy: { connect: { id: context.session.data.id } },
      owner: { connect: { id: user.organization.id } },
      accountingPeriod: { connect: { id: accountingPeriod.id } },
      date: invoiceData.date,
    };

    const newEntry = await context.db.Entry.createOne({
      ...commonProps,
      entryNumber: "",
      description: invoiceData.description,

      attachments: { connect: [{ id: invoice.attachment.id }] },
      lineItems: {
        create: [
          invoiceData.lines.map((item) => {
            return {
              ...commonProps,
              account: accounts.find((a) => {
                if (item.account === a.account) return a.id;
              }),
              debit: item.debit,
              credit: item.credit,
            };
          }),
        ],
      },
    });

    console.log(newEntry);

    // output must conform to the output schema
    return { entry: newEntry };
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
};
