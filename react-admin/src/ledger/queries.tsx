import { gql } from '@apollo/client';

export const ACCOUNTS_LIST = gql`
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

export const ENTRIES = gql`
query Query {
  entrys {
    id
    createdAt
    entryNumber
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
      debit
      credit

    }
    attachments {
      file {
        url
      }
    }
  }
}
`