import { AccountManager } from "./Account/AccountManager";
import { Account, AccountType } from "./Account/Account";
import { Transaction } from "./Transaction/Transaction";
import { TransactionManager } from "./Transaction/TransactionManager";
import { Row, RowType } from "./Row/Row";
import { AccountWithRows } from "./BalanceSheet";

interface LedgerInterface {
  getRowsForAccount(a: Account): Row[];
  getRowsGroupedByAccount(): AccountWithRows[];
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
    const { account } = a.get();

    this.transactionManager
      .getTransactions()
      .forEach((transaction: Transaction) => {
        transaction.getRows().forEach((r: Row) => {
          if (r.getAccount() === account) {
            rows.push(r);
          }
        });
      });

    return rows;
  };

  getRowsGroupedByAccount = (): AccountWithRows[]=> {
    const groupedRows: AccountWithRows[] = [];

    this.accountManager.getAccounts().forEach((account) => {
      groupedRows.push({ account, rows: this.getRowsForAccount(account) });
    });

    return groupedRows;
  };

  getBalanceForAccount = (a: Account): number => {
    const balanceInCents = this.getRowsForAccount(a).reduce((acc: number, row: Row) => {
      const amount = this.getSignedValue(a, row);

      const precision = 2 // hardcoded in keystone schema. TODO: the model

      // amount is a string like "123,35"
      const inCents = Math.round(amount * Math.pow(10, precision))

      return (acc += inCents);
    }, 0);

    // convert
    return balanceInCents / Math.pow(10, 2)
  };

  getBalances = () => {
    const balancesObj: {[key: string]: number} = {};

    this.accountManager.getAccounts().forEach((account: Account) => {
      const balance = this.getBalanceForAccount(account);
      const accountId = account.getAccountNumber();
      balancesObj[accountId] = balance;
    });

    return balancesObj;
  };

  /*
    Quirky accounting detail: signes are flipped for all other accounts than
    asset accounts =)
  */
  getSignedValue = (a: Account, r: Row): number => {
    //const amount = r.getAmount() || 0;
    const debit = r.getDebit()
    const credit = r.getCredit()

    // sign is "normal" for asset account
    if (a.getType() == AccountType.Asset) {


      if (r.getType() === RowType.Debit) {
        return debit;
      } else {
        return -credit;
      }

      // signs is "flipped" for all other account (quirky accounting detail)
    } else {
      if (r.getType() == RowType.Debit) {
        return -debit;
      } else {
        return credit;
      }
    }
  };
}

export const LedgerUI = ({ ledger }: { ledger: Ledger }) => {
  const groupedRows = ledger.getRowsGroupedByAccount();
  const balances = ledger.getBalances();

  return (
    <div>
      {groupedRows.map(({account, rows}: {account: Account, rows: Row[]}) => {
        const {id: accountId, account: accountNumber, name: accountName} = account.get()

        const balance = balances[accountNumber];



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
                {accountNumber} - {accountName}
              </p>
              <table style={{ width: "500px" }}>
                <tbody>
                  {rows.map((row: Row) => {
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

                  <tr>
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
