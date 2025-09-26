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

    const accountingPeriodId = accountingPeriod[0].id;

    console.log("accountingPeriod id: ", accountingPeriodId);

    // retrieve account ids
    const accounts = await context.query.Account.findMany({
      query: "id account",
      where: {
        OR: entryData.lines.map((item) => {
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
      accountingPeriod: { connect: { id: accountingPeriodId } },
      date: entryData.date,
    };

    const lines = entryData.lines.map((item) => {
      const matchedAccount = accounts.find(
        (a) => item.account_no === String(a.account)
      );

      return {
        ...commonProps,
        account: { connect: { id: matchedAccount.id } },
        debit: item.debit.toString() || "",
        credit: item.credit.toString() || "",
      };
    });

    console.log("lines", lines);

    const newEntry = await context.db.Entry.createOne({
      data: {
        ...commonProps,
        description: entryData.description,

        attachments: { connect: [{ id: invoice.attachment.id }] },
        lineItems: {
          create: lines,
        },
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
