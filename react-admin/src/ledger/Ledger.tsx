import {Ledger as LedgerModel, LedgerUI} from "../pbna-core/Ledger"
import {Account} from '../pbna-core/Account/Account'
import {AccountManager} from '../pbna-core/Account/AccountManager'
import {TransactionManager} from '../pbna-core/Transaction/TransactionManager'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


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


const ACCOUNTS_LIST = gql`
query Query {
    accounts {
      account
      description
      id
      type
      name
      vatAccount {
        account
        description
        id
        name
        type
      }
      vatAmount
    }
  }
`

const accounts = await client.query({
    query: ACCOUNTS_LIST
}).then(r => r.data.accounts)


const restoreAccounts = (accounts: []) => {
    accounts.forEach((a) => {
      accountManager.put(new Account(a));
    });
  };

restoreAccounts(accounts)

console.log(accountManager)



export const Ledger = () => {
    return (
        <div>
            <LedgerUI ledger={ledger}/>
        </div>
    )
}