/**
 * Entry
 */

import { gql } from '@apollo/client';

export function entry({raFetchType, builtQuery, params}) {
    switch(raFetchType) {
        case "GET_LIST": {
            return {
                ...builtQuery,
                query: gql`
                    query entrys($orderBy: [EntryOrderByInput!]!, $take: Int, $skip: Int!, $where: EntryWhereInput) {
                        items: entrys(orderBy: $orderBy, take: $take, skip: $skip, where: $where) {
                            id
                            createdAt
                            createdBy {
                                name
                            }
                            date
                            entryNumber
                            description
                            lineItems {
                                id
                                createdAt
                                date
                                debit
                                credit
                                account {
                                    id
                                }
                                description
                                order
                            }
                            lineItemsCount                                
                            accountingPeriod {
                                id
                            }
                        }
                            entrysCount
                    }`,
                variables: {     
                    ...builtQuery.variables,                      
                    take: params.pagination.perPage,
                    skip: (params.pagination.page -1) * params.pagination.perPage
                },
                parseResponse: 
                    (response) => ({
                        data: [
                            ...response.data.items
                        ], 
                        total: response.data.entrysCount
                    })
            }
        }
        case "DELETE": {
            return {
                ...builtQuery,
                query: gql`
                    mutation Mutation($where: EntryWhereUniqueInput!) {
                        deleteEntry(where: $where) {
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