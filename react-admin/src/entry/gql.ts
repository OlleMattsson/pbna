import { gql } from '@apollo/client';

export const createEntry = gql`
mutation Mutation($data: EntryCreateInput!) {
    createEntry(data: $data) {
      id
    }
  }
`

export const getActiveAccountingPeriod = gql`
query AccountingPeriods($where: AccountingPeriodWhereInput!) {
    accountingPeriods(where: $where) {
        id
    }
}
`

export const GET_ACCOUNTS = gql`
    query AccountChart($where: AccountChartWhereUniqueInput!) {
        accountChart(where: $where) {
            accounts {
                id
                account
                name
            }
        }
    }       
`;

export const UPDATE_LINEITEM_ACCOUNT = gql`
    mutation Mutation($where: LineItemWhereUniqueInput!, $data: LineItemUpdateInput!) {
        updateLineItem(where: $where, data: $data) {
            id
            account {
                id
            }
        }
    }
`

export const UPDATE_LINEITEM_DEBCRED = gql`
    mutation Mutation($where: LineItemWhereUniqueInput!, $data: LineItemUpdateInput!) {
        updateLineItem(where: $where, data: $data) {
            id
            debit
            credit
        }
    }
`

export const UPDATE_ENTRY_CREATE_LINEITEM = gql`
mutation Mutation($where: EntryWhereUniqueInput!, $data: EntryUpdateInput!) {
    updateEntry(where: $where, data: $data) {
      id
      lineItems {
        id
        order
      }
    }
  }
`

export const GET_COA= gql`
query Query($where: AccountingPeriodWhereInput!) {
  accountingPeriods(where: $where) {
    accountChart {
      id
    }
  }
}
`