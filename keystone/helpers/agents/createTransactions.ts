/*

    This tool receives a list of inferred transactions from a previous agent step
    and creates transaction records in the database.

*/

import { agentRunner } from "../agentRunner";

export async function createTransactions({
  agent,
  input,
  context,
  agentOutputId,
}) {
  const executor = async ({ context, input }) => {
    const { transactionData } = input;

    console.log("CREATING Transactions");

    const createdTransactions = [];

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

    const commonTransactionData = {
      createdBy: { connect: { id: context.session.data.id } },
      owner: { connect: { id: user.organization.id } },
      accountingPeriod: { connect: { id: accountingPeriodId } },
      isGenerated: true,
    };

    for (const transaction of transactionData) {
      console.log("Transaction:", transaction);

      // create transaction verification
      const transactionVerification =
        await context.query.TransactionVerification.createOne({
          data: {
            status: "pending",
          },
          query: "id",
        });

      // create transaction
      const createdTransaction = await context.query.Transaction.createOne({
        data: {
          ...commonTransactionData,
          verification: { connect: { id: transactionVerification.id } },
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount.toString(),
          counterparty: transaction.counterparty,
          reference: transaction.reference,
          message: transaction.message,
        },
        query: "id",
      });

      // link verification back to transaction
      await context.db.TransactionVerification.updateOne({
        where: { id: transactionVerification.id },
        data: {
          transaction: {
            connect: { id: createdTransaction.id },
          },
        },
      });

      createdTransactions.push(createdTransaction.id);
    }

    // output must conform to the output schema
    return { transactions: createdTransactions };
  };

  try {
    await agentRunner({ agent, input, context, agentOutputId, executor });
  } catch (e) {
    console.log(e);
  }
}
