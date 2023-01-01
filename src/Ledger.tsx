import { AccountManager } from "./Account/AccountManager";
import { Account, AccountType } from "./Account/Account";
import { Transaction } from "./Transaction/Transaction";
import { TransactionManager } from "./Transaction/TransactionManager";
import { Row, RowType } from "./Row/Row";

interface LedgerInterface {
  getRowsForAccount(a: Account): Row[];
  getRowsGroupedByAccount(): [{ number: Row[] }];
  getBalanceForAccount(a: Account): number;
}

export class Ledger implements LedgerInterface {
  accountManager: AccountManager;
  transactionManager: TransactionManager;

  constructor({
    accountManager,
    transactionManager
  }: {
    accountManager: AccountManager;
    transactionManager: TransactionManager;
  }) {
    this.accountManager = accountManager;
    this.transactionManager = transactionManager;
  }

  getRowsForAccount = (a: Account): Row[] => {
    const rows: Row[] = [];
    const { id: accountId } = a.get();

    this.transactionManager
      .getTransactions()
      .forEach((transaction: Transaction) => {
        transaction.getRows().forEach((r: Row) => {
          if (r.getAccount() === accountId) {
            rows.push(r);
          }
        });
      });

    return rows;
  };

  getRowsGroupedByAccount = (): [{ number: Row[] }] => {
    const groupedRows = [];

    this.accountManager.getAccounts().forEach((account) => {
      //const rows = this.getRowsForAccount(account);
      account.rows = this.getRowsForAccount(account);
      groupedRows.push({ ...account });
    });

    return groupedRows;
  };

  getBalanceForAccount = (a: Account): number => {
    return this.getRowsForAccount(a).reduce((acc: number, row: Row) => {
      const amount = this.getSignedValue(a, row);

      return (acc += amount);
    }, 0);
  };

  getBalances = () => {
    const balancesObj = {};
    this.accountManager.getAccounts().forEach((account: Account) => {
      const balance = this.getBalanceForAccount(account);
      const accountId = account.getId();
      balancesObj[accountId] = balance;
    });

    return balancesObj;
  };

  /*
    Quirky accounting detail: signes are flipped for all other accounts than
    asset accounts =)
  */
  getSignedValue = (a: Account, r: Row): number => {
    const amount = r.getAmount();
    if (a.getType() == AccountType.Asset) {
      if (r.getType() === RowType.Debit) {
        return amount;
      } else {
        return -amount;
      }

      // flip signs for all other account (quirky accounting detail)
    } else {
      if (r.getType() == RowType.Debit) {
        return -amount;
      } else {
        return amount;
      }
    }
  };
}

export const LedgerUI = ({ ledger }: { ledger: Ledger }) => {
  const groupedRows = ledger.getRowsGroupedByAccount();
  const balances = ledger.getBalances();

  return (
    <div>
      {groupedRows.map((account: Account) => {
        const accountId = account.getId();
        const accountName = account.getName();
        const balance = balances[accountId];

        if (account.getType() == AccountType.Noop) {
          return (
            <div key={accountId}>
              <p style={{ fontSize: "20pt" }}>{account.getName()}</p>
            </div>
          );
        } else {
          return (
            <div key={accountId}>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "15pt",
                  marginBottom: "0px"
                }}
              >
                {accountId} - {accountName}
              </p>
              <table style={{ width: "500px" }}>
                <tbody>
                  {account.rows.map((row: Row) => {
                    const description = row.getDescription();

                    return (
                      <tr key={row.getId()}>
                        <td style={{ textAlign: "left", minWidth: "400px" }}>
                          {description}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {ledger.getSignedValue(account, row)} €
                        </td>
                      </tr>
                    );
                  })}
                  <tr key={accountId}>
                    <td
                      style={{
                        textAlign: "left"
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}></span>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        borderTop: "1px solid black"
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{balance} €</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      })}
    </div>
  );
};
