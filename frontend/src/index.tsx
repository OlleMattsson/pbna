import { StrictMode } from "react";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const rootElement = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(rootElement);

console.log(process.env)
console.log("herro")

const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query Query {
        entries {
          id
          createdAt
          entryId
          date
          description
          lineItemsCount
          attachmentsCount
          lineItems {
            id
            description
            account
            type
            amount
          }
          attachments {
            file {
              url
            }
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);