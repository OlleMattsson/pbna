import { StrictMode } from "react";
import App from "./App";
//import App from "./App2";
import * as ReactDOMClient from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"

const rootElement = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(rootElement);

/*
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({ 
      uri: 'http://localhost:3000/api/graphql',
      headers: {"Apollo-Require-Preflight": "true"}
    })
  })
*/

root.render(
  <StrictMode>
      <App />
  </StrictMode>
);