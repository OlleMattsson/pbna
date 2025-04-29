import { Account } from "./Account/Account";
import { Ledger } from "./Ledger";
import { AccountWithRows } from "./BalanceSheet"

const getIncomeStatementAccountsAndRows = ({ ledger }: { ledger: Ledger }) => {
  const accountsWithRows: AccountWithRows[] = [];

  // retrieve all income statement accounts and their rows
  ledger.accountManager.getIncomeStatementAccounts().forEach((account: Account) => {
    const accountRows = ledger.getRowsForAccount(account);
    accountsWithRows.push({ account, rows: accountRows });
  });

  return accountsWithRows;
};

export const getBalancesForAccounts = ({ accountsWithRows, ledger }: {accountsWithRows: AccountWithRows[], ledger: Ledger}) => {
  const balancesObj: {[key: string]: number} = {};
  const balancesArr: number[] = [];

  // calculate balance (saldo) for each account
  accountsWithRows.forEach(({account}) => {
    const id = account.getId();
    const balance = ledger.getBalanceForAccount(account);
    balancesObj[id] = balance;
    balancesArr.push(balance);
  });

  return { balancesArr, balancesObj };
};

/**
 * 
 * @param param
 * @returns number
 */
export const getIncome = ({ ledger }: { ledger: Ledger }): number => {
  // helper
  const calculateIncome = (a: number[]) => {
    return a.reduce((entry, acc) => {
      acc += entry;
      return acc;
    }, 0);
  };

  const accountsWithRows = getIncomeStatementAccountsAndRows({
    ledger
  });

  const { balancesArr } = getBalancesForAccounts({
    accountsWithRows,
    ledger
  });

  return calculateIncome(balancesArr)//
};

/**
 *
 * UI COMPONENT
 *
 */
export const IncomeStatementUI = ({ ledger }: { ledger: Ledger }) => {
  
  if (!ledger) {
    return null
  }

  const accountsWithRows = getIncomeStatementAccountsAndRows({
    ledger
  }).sort((a,b) => a.account.account - b.account.account);


  const { balancesObj } = getBalancesForAccounts({
    accountsWithRows,
    ledger
  });
  const income = getIncome({ ledger }).toFixed(2);

  return (
    <div>
      {accountsWithRows.map(({account}) => {
        const {id, name, account: accountNumber} = account.get()

        const balance = balancesObj[id];
        return (
          <div key={id}>
            <p style={{ fontWeight: "bold" }}>
              {accountNumber} - {name}: {balance} €
            </p>
          </div>
        );
      })}
      <p style={{ fontWeight: "bold" }}>Total income: {income} €</p>
    </div>
  );
};
