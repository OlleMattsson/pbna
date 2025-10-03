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

    case 'GET_ONE': {
      return {
        ...builtQuery,
        query: gql`
          query Invoice($where: InvoiceWhereUniqueInput!) {
            invoice(where: $where) {
              id
              createdAt
              isGenerated
              isPaid
              issue_date
              label
              due_date
              description
              recipient_address
              recipient_name
              sender_address
              sender_name
              status
              subtotal_ex_vat_amount
              total_amount
              type
              vat_amount
              vat_rate
              verification {
                id
              }
            }
          }
        `,
        parseResponse: (response) => {
          return { data: { ...response.data.invoice } };
        },
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
              due_date
              description
              label
              total_amount
              status
              sender_name
              recipient_name
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
