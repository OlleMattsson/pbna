/*

    Create entry from inferred invoice data

    TODO: the shape of entryData is not enforced in the input schema for this agent
    It is assumed that entryData has the "correct" shape 

*/
import { agentRunner } from "../agentRunner";

export const createEntry = async ({ agent, input, context, agentOutputId }) => {
  const executor = async ({ agent, input, context }) => {
    console.log("Running Create Entries Tool");

    const { invoiceId, entryData } = input;

    const user = await context.query.User.findOne({
      where: { id: context.session.data.id },
      query: "organization {id}",
    });

    // retrieve accountingPeriod
    // TODO: there can only ever be one active accountingPeriod or everything goes south
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

    // construct the lines
    const lines = entryData.lines.map((item) => {
      const matchedAccount = accounts.find(
        (a) => item.account_no === String(a.account)
      );

      return {
        ...commonProps,
        account: { connect: { id: matchedAccount.id } },
        debit: item.debit.toString() || "",
        credit: item.credit.toString() || "",
        description: item.evidence,
      };
    });

    console.log("lines", lines);

    // create the entry
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
