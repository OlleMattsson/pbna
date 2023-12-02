import { Row } from "../Row/Row";
import { Transaction } from "../Transaction/Transaction";
import { TransactionManager } from "../Transaction/TransactionManager";
import { AccountManager } from "../Account/AccountManager";
import { Account } from "../Account/Account";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});


export const restoreAppStateFromJson = async ({
  json,
  transactionManager,
  accountManager,
  uiSetTransactionState
}: {
  json: string;
  transactionManager: TransactionManager;
  accountManager: AccountManager;
  uiSetTransactionState: Function;
}) => {
  /**
   * Restore Transactions
   *
   * @param transactions
   */
  const restoreTransactions = (transactions: []) => {
    transactionManager.clear();

    const newTransactions = transactions.map((t: { rows: [], attachments: [] }) => {

      console.log(t)

      const rows = t.rows.map((r) => {
        return new Row({
          ...r, 
          date: r.date, 
          description: r.description, 
          precision: r.precision
        });
      });

      return new Transaction(rows, t.attachments);
    });

    newTransactions.forEach((t) => {
      transactionManager.addTransaction(t);
    });

    console.log(transactionManager)

    uiSetTransactionState(transactionManager.getTransactions());

  };

  /**
   * Restore Accounts
   * @param accounts
   */
  const restoreAccounts = (accounts: []) => {
    accounts.forEach((a) => {
      accountManager.put(new Account(a));
    });
  };

  /**
   * main
   */
  try {

    /*
    const response = await client
    .query({
      query: gql`
        query Query {
          entries {
            id
            createdAt
            entryId
            date
            description
            lineItemsCount
            attachmentsCount
            lineItems {
              id
              account {
                id
                account
                type
                name
                description
              }
              type
              amount
            }
            attachments {
              file {
                url
              }
            }
          }
        }
      `,
    })
    console.log(response)
  */
  
    
    const parsed = JSON.parse(json)
    restoreAccounts(parsed.accounts);
    restoreTransactions(parsed.transactions);
    
  } catch (e) {
    console.error(e);
  }
};
