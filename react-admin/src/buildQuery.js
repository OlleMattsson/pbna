// our fancy client that splits queries and subscriptions
import { client as wsClient } from './dataProviders/apolloClient';

// graphql queries for resources that override the default querybuilder queries
import { accountChart } from './dataProviders/graphql/accountChart';
import { account } from './dataProviders/graphql/account';
import { accountingPeriod } from './dataProviders/graphql/accountingPeriod';
import { organization } from './dataProviders/graphql/organization';
import { entry } from './dataProviders/graphql/entry';
import { invoice } from './dataProviders/graphql/invoice';

// use a modified adapter based on ra-data-graphql-simple
// for most practical use cases, however, the custom queries should are used
import buildGraphQLProvider, { buildQuery } from './ra-data-keystone6/src';

const customizeBuildQuery = introspectionResults => (raFetchType, resourceName, params) => {
    const builtQuery = buildQuery(introspectionResults)(raFetchType, resourceName, params);

    const args = {raFetchType, builtQuery, params}

    switch (resourceName) {
        case "AccountChart": {
            return accountChart(args)
        }
        case "Account": {
            return account(args)
        }
        case "AccountingPeriod": {
            return accountingPeriod(args)
        }
        case "Organization": {
            return organization(args)
        }
        case "Entry": {
            return entry(args)
        }
        case "Invoice": {
            return invoice(args)
        }     
    }

    console.log("Using default builder for", resourceName, raFetchType, builtQuery)
    // use the builder's queries by default
    return builtQuery
}

export default buildGraphQLProvider({ 
    client: wsClient, 
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