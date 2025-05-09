import { Account, AccountType } from "./Account/Account";
import { Row, RowType } from "./Row/Row";
import { Ledger } from "./Ledger";
import { getIncome, getBalancesForAccounts } from "./IncomeStatement";


export type AccountWithRows = {account: Account, rows:Row[]}


export const BalanceSheetUI = ({ ledger }: { ledger: Ledger }) => {

  if (!ledger) {
    return null
  }


  // Used for containing the account information for the UI
  // They serve a double purpose in also containing the row for each account
  // so that the saldo for each account can be calculated and displayed
  // Like so: [{...Account, rows: [Row]], ...}

  // TODO somehow declare a type that combines Account with a list of Rows
  const assetAccountsWithRows: AccountWithRows[] = [];
  const liabilityAccountsWithRows: AccountWithRows[] = [];

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

  // Create a temporary account that contains the income row above
  const temporaryIncomeAccount = new Account({
    account: INCOME_ACCOUNT_ID,
    id: INCOME_ACCOUNT_ID as unknown as string, // the id is usually a uuid string, this is a hack
    type: AccountType.Liability,
    name: "resultat"
  });

  // Create a temporary row that contains the income amount
  const resultRow = new Row({
    description: "resultat",
    account: temporaryIncomeAccount,
    date: new Date(),
    type: RowType.Credit
  });

  const income = getIncome({ ledger })

  resultRow.setCredit(income);


  /**
   * 2. ASSETS
   */
  const assetAccounts = ledger.accountManager.getAssetAccounts();

  assetAccounts.forEach((account) => {
    assetAccountsWithRows.push({
      account,
      rows: ledger.getRowsForAccount(account)
    });
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

  assetAccountsWithRows.sort((a,b) => a.account.account - b.account.account)

  /**
   * 3. LIABILITIES & Equity
   */

  const liabilityAccounts = ledger.accountManager.getLiabilityAccounts();

  // add the temporary income account to the liabilities
  liabilityAccounts.push(temporaryIncomeAccount);

  liabilityAccounts.forEach((account) => {
    liabilityAccountsWithRows.push({ account, rows: ledger.getRowsForAccount(account)});
  });

  // add the temporaruy result row
  liabilityAccountsWithRows.forEach((obj: AccountWithRows) => {
    const {account} = obj
    if (account.account == INCOME_ACCOUNT_ID) {
      obj.rows.push(resultRow);
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

  liabilityAccountsWithRows.sort((a,b) => a.account.account - b.account.account)

  return (
    <div>
      <div>
        <h3>A$$ets</h3>
        {assetAccountsWithRows.map(({account: a}) => {
          const {id, account, name} = a
          const balance = assetBalancesObj[id];
          return (
            <div key={id}>              
              <span>{account} - </span>
              <span>{name}: </span>
              <span>{balance} €</span>
            </div>
          );
        })}
        <span style={{ fontWeight: "bold" }}>total: {assetBalance}</span>
      </div>
      <div>
        <h3>Liabilities & Equity</h3>
        {liabilityAccountsWithRows.map(({account: a}) => {
          const {id, name, account} = a
          const balance = liabilityBalancesObj[id];
          
          return (
            <div key={id}>
              <span>{account} - </span>
              <span>{name}: </span>
              <span>{balance} €</span>
            </div>
          );
        })}
        <span style={{ fontWeight: "bold" }}>total: {liabilityBalance}</span>
      </div>
    </div>
  );
};
