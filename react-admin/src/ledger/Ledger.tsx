import {Ledger as LedgerModel, LedgerUI} from "../pbna-core/Ledger"
import {Account} from '../pbna-core/Account/Account'
import {AccountManager} from '../pbna-core/Account/AccountManager'
import {TransactionManager} from '../pbna-core/Transaction/TransactionManager'
import { Row } from "../pbna-core/Row/Row";
import { Transaction } from "../pbna-core/Transaction/Transaction";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {ENTRIES, ACCOUNTS_LIST} from './queries'


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
});

const accountManager = new AccountManager();
const transactionManager = new TransactionManager();

const ledger = new LedgerModel({
    accountManager,
    transactionManager
})


const accounts = await client.query({
    query: ACCOUNTS_LIST
}).then(r => r.data.accounts)


const entries = await client.query({
  query: ENTRIES
}).then(response => response.data.entrys)


const restoreAccounts = (accounts: []) => {
    accounts.forEach((a) => {
      accountManager.put(new Account(a));
    });
};

/**
   * Restore Transactions
   *
   * @param transactions
   */
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

console.log(accountManager)
console.log(transactionManager)

export const Ledger = () => {
    return (
        <div>
            <LedgerUI ledger={ledger}/>
        </div>
    )
}

