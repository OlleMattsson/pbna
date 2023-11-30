import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

// use a modified adapter based on ra-data-graphql-simple
import buildGraphQLProvider, { buildQuery } from './ra-data-keystone6/src';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql'
    })
});

const customizeBuildQuery = introspectionResults => (raFetchType, resourceName, params) => {
    const builtQuery = buildQuery(introspectionResults)(raFetchType, resourceName, params);

    /*
        Custom override: Get enteis list
    */
    if ( resourceName === "Entry") {

        switch(raFetchType) {
            case "GET_LIST": {
                return {
                    ...builtQuery,
                    query: gql`
                        query entrys($orderBy: [EntryOrderByInput!]!, $take: Int, $skip: Int!) {
                            items: entrys(orderBy: $orderBy, take: $take, skip: $skip) {
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
                                __typename
                            }
                            lineItemsCount
                            __typename
                            }
                            entrysCount
                        }`,
                    variables: {       
                        orderBy: [{
                            "entryNumber": "asc"
                        }],
                        take: params.pagination.perPage,
                        skip: (params.pagination.page -1) * params.pagination.perPage
                    }
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

        }


    }

    return builtQuery
}

export default buildGraphQLProvider({ 
    client: client, 
    buildQuery: customizeBuildQuery,
    introspection: {
        operationNames: {
            /**
             * keystone has all lowercase resource names
             */
            "GET_ONE": resource => {
                return `${lowercaseFirstLetter(resource.name)}`
            },

            /**
            * the schema introspection expects list to have the format "item" -> "allItem"
            * here, the builder is configured to use "items" 
            */
            "GET_LIST": resource => {
                return `${lowercaseFirstLetter(resource.name)}s`
            },
            
            "GET_MANY": resource => {
                return `${lowercaseFirstLetter(resource.name)}s`
            } 
                 
        }
    }
})

const lowercaseFirstLetter = (str) => {
    if (!str) return str; // Return the original string if it's empty
    return str.charAt(0).toLowerCase() + str.slice(1);
}