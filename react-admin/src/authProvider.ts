import { AuthProvider, HttpError } from "react-admin";
import data from "./users.json";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3000/api/graphql',
  
  // store cookie in Set-Cookie header
  credentials: 'include'
});

const AUTHENTICATE = gql`
mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      item {
        role
        id
        organization {
          id
        }
      }
      sessionToken
    }
    ... on UserAuthenticationWithPasswordFailure {
      message
    }
  }
}
`


export const authProvider: AuthProvider = {
  login: ({ username, password }) => {

    return client.mutate({
      mutation: AUTHENTICATE,
      variables: {
        email: username,
        password
      }
    }).then(r => {
      
      if (r.data.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure") {
        return Promise.reject(
          r.data.authenticateUserWithPassword.message)
      }

      if (r.data.authenticateUserWithPassword.sessionToken) {
        let { ...userToPersist } = r.data.authenticateUserWithPassword.item;
        localStorage.setItem("user", JSON.stringify(userToPersist));        
        return Promise.resolve()
      }

    }).catch(e => {
      console.log("error", e)
    })


    

    
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
