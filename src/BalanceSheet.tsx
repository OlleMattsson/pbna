import { AccountManager } from "./Account/AccountManager";
import { Account, AccountType } from "./Account/Account";
import { Row, RowType } from "./Row/Row";
import { Ledger } from "./Ledger";
import { getIncome, getBalancesForAccounts } from "./IncomeStatement";

export const BalanceSheetUI = ({ ledger }: { ledger: Ledger }) => {
  // Used for containing the account information for the UI
  // They server a double purpose in also containing the row for each account
  // so that the saldo for each account can be calculated and displayed
  // Like so: [{...Account, rows: [Row]], ...}
  const assetAccountsWithRows = [];
  const liabilityAccountsWithRows = [];

  /**
   *
   *  prepare data for the UI
   *  1. get income from income statement and prepare a temporary model for containing it
   *  2. prepare the asset side of the balance sheet
   *  3. prepare the liabilities&equities side of the balance sheet.
   *     During this step. the income statement row is also added to this side.
   */

  /**
   * 1. INCOME row
   */

  // account ID for temporary income account
  // should not exist in the account manager!
  const INCOME_ACCOUNT_ID = 2099;

  // Create a temporary row that contains the income amount
  const resultRow = new Row({
    description: "resultat",
    account: INCOME_ACCOUNT_ID.toString(10),
    date: new Date(),
    type: RowType.Credit
  });

  resultRow.setAmount(getIncome({ ledger }));

  // Create a temporary account that contains the income row above
  const temporaryIncomeAccount = new Account({
    name: "resultat",
    id: INCOME_ACCOUNT_ID,
    type: AccountType.liability
  }) as Object;

  /**
   * 2. ASSETS
   */
  const assetAccounts = ledger.accountManager.getAssetAccounts();

  assetAccounts.forEach((account) => {
    account.rows = ledger.getRowsForAccount(account);
    assetAccountsWithRows.push({ ...account });
  });

  const {
    balancesArr: assetBalancesArr,
    balancesObj: assetBalancesObj
  } = getBalancesForAccounts({
    accountsWithRows: assetAccountsWithRows,
    ledger
  });

  // asset balance
  const assetBalance = assetBalancesArr.reduce((entry, acc) => {
    acc += entry;
    return acc;
  }, 0);

  /**
   * 3. LIABILITIES & Equity
   */

  const liabilityAccounts = ledger.accountManager.getLiabilityAccounts();

  // add the temporary income account to the liabilities
  liabilityAccounts.push(temporaryIncomeAccount);

  liabilityAccounts.forEach((account) => {
    account.rows = ledger.getRowsForAccount(account);
    liabilityAccountsWithRows.push({ ...account });
  });

  // add the temporaruy result row
  liabilityAccountsWithRows.forEach((account) => {
    if (account.id == INCOME_ACCOUNT_ID) {
      account.rows.push(resultRow);
    }
  });

  const {
    balancesArr: liabilityBalancesArr,
    balancesObj: liabilityBalancesObj
  } = getBalancesForAccounts({
    accountsWithRows: liabilityAccountsWithRows,
    ledger
  });

  // add the result to the liabilities balance by hand
  const signedResult = ledger.getSignedValue(temporaryIncomeAccount, resultRow);
  liabilityBalancesObj[INCOME_ACCOUNT_ID] = signedResult;
  liabilityBalancesArr.push(signedResult);

  // liability balance
  const liabilityBalance = liabilityBalancesArr.reduce((entry, acc) => {
    acc += entry;
    return acc;
  }, 0);

  return (
    <div>
      <div>
        <h3>A$$ets</h3>
        {assetAccountsWithRows.map((account) => {
          const accountId = account.getId();
          const accountName = account.getName();
          const balance = assetBalancesObj[accountId];
          return (
            <div key={accountId}>
              <span>{accountName}: </span>
              <span>{balance} €</span>
            </div>
          );
        })}
        <span style={{ fontWeight: "bold" }}>{assetBalance}</span>
      </div>
      <div>
        <h3>Liabilities & Equity</h3>
        {liabilityAccountsWithRows.map((account) => {
          const accountId = account.getId();
          const accountName = account.getName();
          const balance = liabilityBalancesObj[accountId];
          return (
            <div key={accountId}>
              <span>{accountName}: </span>
              <span>{balance} €</span>
            </div>
          );
        })}
        <span style={{ fontWeight: "bold" }}>{liabilityBalance}</span>
      </div>
    </div>
  );
};
