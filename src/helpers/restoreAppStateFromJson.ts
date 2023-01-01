import { Row } from "./../Row/Row";
import { Transaction } from "./../Transaction/Transaction";
import { TransactionManager } from "../Transaction/TransactionManager";
import { AccountManager } from "../Account/AccountManager";
import { Account } from "../Account/Account";

export const restoreAppStateFromJson = ({
  json,
  transactionManager,
  accountManager,
  uiSetTransactionState
}: {
  json: string;
  transactionManager: TransactionManager;
  accountManager: AccountManager;
  uiSetTransactionState: Function;
}) => {
  /**
   * Restore Transactions
   *
   * @param transactions
   */
  const restoreTransactions = (transactions: []) => {
    transactionManager.clear();

    const newTransactions = transactions.map((t: { rows: [] }) => {
      const rows = t.rows.map((r) => {
        return new Row(r);
      });

      return new Transaction(rows);
    });

    newTransactions.forEach((t) => {
      transactionManager.addTransaction(t);
    });

    uiSetTransactionState(transactionManager.getTransactions());
  };

  /**
   * Restore Accounts
   * @param accounts
   */
  // TODO: implement =)
  const restoreAccounts = (accounts: []) => {
    accounts.forEach((a) => {
      accountManager.put(new Account(a));
    });
  };

  /**
   * main
   */
  try {
    const data = JSON.parse(json);
    restoreAccounts(data.accounts);
    restoreTransactions(data.transactions);
  } catch (e) {
    console.error(e);
  }
};
