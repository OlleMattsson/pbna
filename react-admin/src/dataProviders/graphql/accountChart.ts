/**
 * Account Chart (or "Chart of Accounts" - CoA)
 */

import { gql } from '@apollo/client';

export function accountChart({raFetchType, builtQuery, params}) {
    switch(raFetchType) {
        case "UPDATE": {
            const variables = builtQuery.variables;

            delete variables.data.id
            delete variables.data.accountsCount
            delete variables.data.accountsIds
            delete variables.data.__typename
            
            variables.data = {
                ...variables.data,
                accounts: {
                    set: variables.data.accounts // set replaces old connections with new ones
                }
            }
            
            return {
                ...builtQuery
            }
        }
        // sort the account references
        case "GET_ONE": {
            return {
                ...builtQuery,
                variables: {
                    ...builtQuery.variables,
                    orderBy: [{
                        account: "asc"
                    }]
                }
                
            }
        }
        case "DELETE": {
            return {
                ...builtQuery,
                query: gql`
                mutation DeleteAccountChart($where: AccountChartWhereUniqueInput!) {
                    deleteAccountChart(where: $where) {
                        id
                    }
                    }
                `,
                variables: {                   
                    "where": {
                        "id": params.id
                    }                                           
                },
                parseResponse: () => {
                    return { data: { id: params.id } };
                }
            }
        }
        default: {
            return builtQuery
        }     
    }
}