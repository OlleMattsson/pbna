/**
 * Accounting Period
 */

import { gql } from '@apollo/client';

export function invoiceVerification({ raFetchType, builtQuery, params }) {
  console.log('invoiceVerification', { raFetchType, builtQuery, params });

  switch (raFetchType) {
    case 'UPDATE': {
      const variables = builtQuery.variables;
      delete variables.data.id;

      return {
        ...builtQuery,
        variables,
      };
    }

    default: {
      return builtQuery;
    }
  }
}
