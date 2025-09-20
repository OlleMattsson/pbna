import { gql } from '@apollo/client';
import { filterParamsToGraphql } from './utils';

export function invoice({ raFetchType, builtQuery, params }) {
  switch (raFetchType) {
    case 'CREATE': {
      return {
        ...builtQuery,
        query: gql`
          mutation createInvoice($data: InvoiceCreateInput!) {
            data: createInvoice(data: $data) {
              id
            }
          }
        `,
      };
    }

    case 'GET_LIST': {
      return {
        ...builtQuery,
        query: gql`
          query Invoices(
            $orderBy: [InvoiceOrderByInput!]!
            $take: Int
            $skip: Int!
            $where: InvoiceWhereInput
          ) {
            items: invoices(orderBy: $orderBy, take: $take, skip: $skip, where: $where) {
              id
              createdAt
              date
              invoiceNumber
              description
              totalAmount
              status
            }
            invoicesCount
          }
        `,
        variables: {
          where: filterParamsToGraphql(params.filter),
          orderBy: [{ createdAt: 'desc' }],
          take: params.pagination.perPage,
          skip: (params.pagination.page - 1) * params.pagination.perPage,
        },
        parseResponse: (response) => ({
          data: [...response.data.items],
          total: response.data.invoicesCount,
        }),
      };
    }
    default: {
      return builtQuery;
    }
  }
}
