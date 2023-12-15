import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/core.cjs';
import { HttpLink } from "@apollo/client/link/http/http.cjs";
import { ApolloLink } from "@apollo/client/link/core/ApolloLink.js"


const gqlApi = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://keystone:3000/api/graphql'
})

export const keystoneAuth = async () => {
    return await gqlApi.mutate({
        mutation: gql`
        mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
            authenticateUserWithPassword(email: $email, password: $password) {
              ... on UserAuthenticationWithPasswordSuccess {
                item {
                  id
                }
                sessionToken
              }
              ... on UserAuthenticationWithPasswordFailure {
                message
              }
            }
          }
        `,
        variables: {
            email: process.env.KEYSTONE_EMAILVERIFYER_USER,
            password: process.env.KEYSTONE_EMAILVERIFYER_PW
        }
    }).then(r => {
        const {item, __typename, message, sessionToken }  = r.data.authenticateUserWithPassword
    
        if (__typename === "UserAuthenticationWithPasswordFailure") {
            return Promise.reject(message)
        }
    
        if (__typename === "UserAuthenticationWithPasswordSuccess") {
            return sessionToken
        }
    }).catch(e => {
        console.log("error", e)
    })
}

// https://www.apollographql.com/docs/react/networking/advanced-http-networking/
export const authenticatedClient = (sessionToken) => {
  const httpLink = new HttpLink({ uri: 'http://keystone:3000/api/graphql' });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${sessionToken}`
      }
    }));
  
    return forward(operation);
  })
  
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.concat(authMiddleware, httpLink),
  });
}
