/**
 * Accounting Period    
 */

import { gql } from '@apollo/client';

export function accountingPeriod({raFetchType, builtQuery, params}) {

    console.log("accountingPeriod", {raFetchType, builtQuery, params})

    const user = JSON.parse(localStorage.getItem("user"))

        switch(raFetchType) {
            
            case "UPDATE": {
                const variables = builtQuery.variables;

                variables.data = {
                    ...variables.data,
                    accountChart: {
                        connect: {
                            id: variables.data.accountChart.id
                        }
                    }
                }
        
                delete variables.data.id
                delete variables.data.owner
                delete variables.data["owner.id"]
                delete variables.data["accountChart.id"]
                
                return {
                    ...builtQuery,
                    variables
                }
            }
            case "CREATE": {
                const variables = builtQuery.variables;

                variables.data = {
                    ...variables.data,
                    accountChart: {
                        connect: {
                            id: variables.data.accountChart.id
                        }
                    },
                    owner: {
                        connect: {
                            id: user.organization.id
                        }
                    }                    
                }

                delete variables.data.id

                return {
                    ...builtQuery,
                    variables
                }
            } 
            case "DELETE": {
                return {
                    query: gql`
                        mutation DeleteAccountingPeriod($where: AccountingPeriodWhereUniqueInput!) {
                            deleteAccountingPeriod(where: $where) {
                                id
                            }
                        }                    
                    `,
                    variables: {                   
                        where: {
                            id: params.id
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