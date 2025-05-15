import { LedgerUI } from "../pbna-core/Ledger"
import { Account } from '../pbna-core/Account/Account'
import { Row } from "../pbna-core/Row/Row";
import { Transaction } from "../pbna-core/Transaction/Transaction";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ENTRIES, ACCOUNTS_LIST} from './queries'
import { client } from "../dataProviders/apolloClient";

// TODO: move this pbna initialisation code to its own file

// Sidestepping the RA dataprovider fir this view
/*
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'include'  // add Cookie header to requests
});

*/

// restore accounts
export const initData = async (ledger) => {

  // mattssoft
  // TODO: this should be loaded dynamically instead
  const organisationId = "19156e94-d681-4d38-9e77-7b9942db1c5d"

  let accountingPeriodId, accounts;

  accounts = await client.query({
    query: ACCOUNTS_LIST,
    variables: {
      where: {
        "owner": {
          "id": {
            "equals": organisationId
          }
        },
        "AND" : [
          {
            "isActive": {
              "equals": true
            }
          }
        ]
    
      }
    }
  }).then(r => {
    accountingPeriodId = r.data.accountingPeriods[0].id
    accounts = r.data.accountingPeriods[0].accountChart.accounts
    return 
  }).then(() => {
    accounts.forEach((a) => {
      ledger.accountManager.put(new Account(a));
    });
  })


  const transactions = await client.query({
    query: ENTRIES,
    variables: {
      where: {
        "owner": {
          "id": {
            "equals" : organisationId
          }
        },
        "AND": [
          {
            "accountingPeriod": {
              "id": {
                "equals": accountingPeriodId
              }
            }
          }
        ]
      }
    
    }
  }).then(response => response.data.entrys)

  const newTransactions = transactions.map((t: { lineItems: [], attachments: [] }) => {
    
    const rows = t.lineItems.map((r) => {
      return new Row({...r, date: t.date, description: t.description, precision: 0});
    });

    return new Transaction(rows, t.attachments);
  });

  newTransactions.forEach((t) => {
    ledger.transactionManager.addTransaction(t);
  });

  return ledger

};

export const Ledger = ({ledger}) => {
    return (
        <div>
            <LedgerUI ledger={ledger}/>
        </div>
    )
}

