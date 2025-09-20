import { gql } from '@apollo/client';
import { filterParamsToGraphql } from './utils';

export function orchestrator({ raFetchType, builtQuery, params }) {
  console.log('orchestrator data provider');

  switch (raFetchType) {
    // TODO: no pagination enabled for these =)
    case 'GET_LIST': {
      return {
        ...builtQuery,
        query: gql`
          query Orchestrators($where: OrchestratorWhereInput!) {
            orchestrators(where: $where) {
              id
            }
            orchestratorsCount
          }
        `,
        variables: {
          where: filterParamsToGraphql(params.filter),
        },
        parseResponse: (response) => ({
          data: [...response.data.orchestrators],
          total: response.data.orchestratorsCount,
        }),
      };
    }
    default: {
      return builtQuery;
    }
  }
}
