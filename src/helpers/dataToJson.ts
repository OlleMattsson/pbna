import { Account } from "./../Account/Account";
import { AccountManager } from "./../Account/AccountManager";
import { Transaction } from "./../Transaction/Transaction";
import { TransactionManager } from "./../Transaction/TransactionManager";

export const dataToJson = ({
  accountManager,
  transactionManager
}: {
  accountManager: AccountManager;
  transactionManager: TransactionManager;
}) => {
  const transactions = transactionManager
    .getTransactions()
    .map((t: Transaction, i) => {
      return { rows: t.getRows() };
    });

  const accounts = accountManager.getAccounts().map((a: Account, i) => {
    return a.get();
  });

  const data = {
    accounts: accounts,
    transactions: transactions
  };

  const json = JSON.stringify(data);

  return json;
};
