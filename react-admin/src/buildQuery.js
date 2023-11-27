import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

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