import { gql } from '@apollo/client';

export const ACCOUNTS_LIST = gql`
query Query($where: AccountingPeriodWhereInput!) {
  accountingPeriods(where: $where) {
    id
    accountChart {
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
  }
}
`

export const ENTRIES = gql`
query Entrys($where: EntryWhereInput!) {
  entrys(where: $where) {
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

export const ACCOUNTING_PERIOD = gql`
  query AccountingPeriods($where: AccountingPeriodWhereInput!) {
    accountingPeriods(where: $where) {
      id
      label
    }
  }
`