import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient }    from 'graphql-ws';

const {
    VITE_GRAPHQL_API_HOST, 
    VITE_GRAPHQL_API_PATH, 
    VITE_GRAPHQL_API_SUBS_HOST,
    VITE_GRAPHQL_API_SUBS_PATH
} = import.meta.env

// Your existing HTTP link
const httpLink = new HttpLink({
    uri: `${VITE_GRAPHQL_API_HOST}${VITE_GRAPHQL_API_PATH}`,
    credentials: 'include',
  });

// Derive the WS URL cleanly
const wsUrl = new URL(VITE_GRAPHQL_API_SUBS_HOST);
wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:';
wsUrl.pathname = VITE_GRAPHQL_API_SUBS_PATH;

// New WebSocket link for subscriptions

export const wsLink = new GraphQLWsLink(
    createClient({
        url: wsUrl.toString(),
        lazy: true,
        
        retryAttempts: 2, // 0 to disable       
        retryWait: async (n) => {
            console.log("retryWait", n)
            return 10000
        },
        shouldRetry: (errOrCloseEvent) => {
            console.warn(
                'Socket closed',
                'code=', errOrCloseEvent.code,
                'reason=', errOrCloseEvent.reason,
                'wasClean=', errOrCloseEvent.wasClean
              );
            return false
        },
        connectionAckWaitTimeout: 20_000
        
    })
  );  
  
// Split based on operation type
const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,     // send subscriptions here
    httpLink    // send queries & mutations here
  );  

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
          },
          query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },        
    },
});