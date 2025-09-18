/**
 * Accounts
 */

import { gql } from '@apollo/client';

export function account({raFetchType, builtQuery, params}) {
    switch(raFetchType) {
        case "GET_LIST": {
            return {
                ...builtQuery,
                variables: {
                    ...builtQuery.variables,
                    orderBy: [{
                        account: "asc"
                    }]
                }, 
            }
        }
        case "GET_MANY": {
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
        default: {
            return builtQuery
        }        
    }
}