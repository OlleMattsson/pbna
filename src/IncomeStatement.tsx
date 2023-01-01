import { Account } from "./Account/Account";

import { Ledger } from "./Ledger";

const getIncomeStatementAccountsAndRows = ({ ledger }: { ledger: Ledger }) => {
  const accountsWithRows = [];

  // retrieve all income statement accounts and their rows
  ledger.accountManager.getIncomeStatementAccounts().forEach((a: Account) => {
    const accountRows = ledger.getRowsForAccount(a);
    const accountWithRowsObject = { ...a, rows: accountRows };
    accountsWithRows.push(accountWithRowsObject);
  });

  return accountsWithRows;
};

export const getBalancesForAccounts = ({ accountsWithRows, ledger }) => {
  const balancesObj = {};
  const balancesArr = [];

  // calculate balance (saldo) for each account
  accountsWithRows.forEach((account) => {
    const id = account.getId();
    const balance = ledger.getBalanceForAccount(account);
    balancesObj[id] = balance;
    balancesArr.push(balance);
  });

  return { balancesArr, balancesObj };
};

export const getIncome = ({ ledger }: { ledger: Ledger }): number => {
  // helper
  const calculateIncome = (a: [number]) => {
    return a.reduce((entry, acc) => {
      acc += entry;
      return acc;
    }, 0);
  };

  const accountsWithRows = getIncomeStatementAccountsAndRows({
    ledger
  });

  const { balancesArr, balancesObj } = getBalancesForAccounts({
    accountsWithRows,
    ledger
  });

  return calculateIncome(balancesArr).toFixed(2);
};

/**
 *
 * UI COMPONENT
 *
 */
export const IncomeStatementUI = ({ ledger }: { ledger: Ledger }) => {
  const accountsWithRows = getIncomeStatementAccountsAndRows({
    ledger
  });
  const { balancesArr, balancesObj } = getBalancesForAccounts({
    accountsWithRows,
    ledger
  });
  const income = getIncome({ ledger });

  return (
    <div>
      {accountsWithRows.map((account) => {
        const accountId = account.id;
        const accountName = account.name;

        const balance = balancesObj[accountId];
        return (
          <div key={accountId}>
            <p style={{ fontWeight: "bold" }}>
              {accountId} - {accountName}: {balance} €
            </p>
          </div>
        );
      })}
      <p style={{ fontWeight: "bold" }}>Total income: {income}</p>
    </div>
  );
};
