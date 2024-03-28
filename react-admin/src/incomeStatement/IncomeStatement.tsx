import { Ledger as LedgerModel } from "../pbna-core/Ledger"
import { IncomeStatementUI } from "../pbna-core/IncomeStatement";
import { AccountManager } from '../pbna-core/Account/AccountManager'
import { TransactionManager } from '../pbna-core/Transaction/TransactionManager'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ENTRIES, ACCOUNTS_LIST} from '../ledger/queries'
import { Row } from "../pbna-core/Row/Row";
import { Transaction } from "../pbna-core/Transaction/Transaction";
import { Account } from '../pbna-core/Account/Account'

// Sidestepping the RA dataprovider fir this view
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
});

// init the pbna model
const accountManager = new AccountManager();
const transactionManager = new TransactionManager();
const ledger = new LedgerModel({
    accountManager,
    transactionManager
})

// fetch accounts
const accounts = await client.query({
    query: ACCOUNTS_LIST
}).then(r => r.data.accounts)

// fetch entries
const entries = await client.query({
  query: ENTRIES
}).then(response => response.data.entrys)

// restore accounts
const restoreAccounts = (accounts: []) => {
    accounts.forEach((a) => {
      accountManager.put(new Account(a));
    });
};


// restore transactions (entries)
const restoreTransactions = (transactions: []) => {
  transactionManager.clear();

  const newTransactions = transactions.map((t: { lineItems: [], attachments: [] }) => {
    
    const rows = t.lineItems.map((r) => {
      return new Row({...r, date: t.date, description: t.description, precision: 0});
    });


    return new Transaction(rows, t.attachments);
  });

  newTransactions.forEach((t) => {
    transactionManager.addTransaction(t);
  });

};

// "main" 
restoreAccounts(accounts)
restoreTransactions(entries);

export const IncomeStatement = () =>  {
    return (
        <div>
            <IncomeStatementUI ledger={ledger}/>
        </div>
    )
}