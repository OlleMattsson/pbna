import { Account, AccountType } from "./Account/Account";
import { Ledger } from "./Ledger";
import { AccountWithRows } from "./BalanceSheet"

const getIncomeStatementAccountsAndRows = ({ ledger }: { ledger: Ledger }) => {
  const accountsWithRows: AccountWithRows[] = [];

  // retrieve all income statement accounts and their rows
  ledger.accountManager.getIncomeStatementAccounts().forEach((account: Account) => {
    const accountRows = ledger.getRowsForAccount(account);
    accountsWithRows.push({ account, rows: accountRows });
  });

  // retrieve NoOp Accounts as these are used for grouping and labelling
  ledger.accountManager.getNoopAccounts().forEach((a: Account) => {
    accountsWithRows.push({ account: a, rows: [] });
  });


  return accountsWithRows;
};

export const getBalancesForAccounts = ({ accountsWithRows, ledger }: {accountsWithRows: AccountWithRows[], ledger: Ledger}) => {
  const balancesObj: {[key: string]: number} = {};
  const balancesArr: number[] = [];

  // calculate balance (saldo) for each account
  accountsWithRows.forEach(({account}) => {
    const id = account.id;
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
export const IncomeStatementUI = ({ 
  ledger,
}: { 
  ledger: Ledger 
}) => {
  
  if (!ledger) {
    return null
  }

  const accountsWithRows = getIncomeStatementAccountsAndRows({
    ledger
  }).sort((a,b) => a.account.account - b.account.account);

  //console.log(accountsWithRows)


  const { balancesObj } = getBalancesForAccounts({
    accountsWithRows,
    ledger
  });

  const income = getIncome({ ledger }).toFixed(2);

  return (
    <div>
      {accountsWithRows.map(({account}) => {
        const {id, name, account: accountNumber} = account.get()

        if (account.type === AccountType.Noop) {
          return (
            <div key={id}>
            <p style={{ fontWeight: "bold" }}>
              {name} ({accountNumber})
            </p>
          </div>            
          )
        }

        const balance = balancesObj[id];
        return (
          <div key={id}>
            <p style={{marginLeft: "20px" }}>
              {accountNumber} - {name}: {balance} €
            </p>
          </div>
        );
      })}
      <p style={{ fontWeight: "bold" }}>Total income: {income} €</p>
    </div>
  );
};
