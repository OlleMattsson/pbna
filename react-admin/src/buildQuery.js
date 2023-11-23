import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// use a modified adapter based on ra-data-graphql-simple
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple-keystone6';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql'
    })
});

const customizeBuildQuery = introspectionResults => (raFetchType, resourceName, params) => {
   
    const builtQuery = buildQuery(introspectionResults)(raFetchType, resourceName, params);

    switch (raFetchType){
        case "GET_LIST":
            return {
                ...builtQuery,
                parseResponse: response => {
                    return {
                        data: response.data.items,
                        total: response.data.items.length
                    }
                }        
            }
           
        case "GET_ONE": {
            return {
                ...builtQuery,
                parseResponse: response => {
                    return {
                        data: response.data.data
                    }
                }        
            }
        }
    }
}

export default buildGraphQLProvider({ 
    client: client, 
    buildQuery: customizeBuildQuery,
    introspection: {
        /**
         * the schema introspection expects list to have the format "item" -> "allItem"
         * here, the builder is configured to use "items" 
         */
        operationNames: {
            "GET_LIST": resource => {
                return `${resource.name.toLowerCase()}s`
            },
            "GET_ONE": resource => {
                return `${resource.name.toLowerCase()}`
            }
        }
    }
})