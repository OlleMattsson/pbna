import * as React from "react";
import {useState} from "react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
});

// hardcoded accountchart for now
const accountChart = "0c0fc14c-3fe1-4ade-a898-37361947ee63"

const GET_ACCOUNTS = gql`
    query AccountChart($where: AccountChartWhereUniqueInput!) {
        accountChart(where: $where) {
            accounts {
                account
                name
            }
        }
    }       
    `

let accounts = null

client.query({
    query: GET_ACCOUNTS,
    variables: {
        where: {
          id: accountChart
        }
      }
}).then( r => {
    accounts = r.data.accountChart.accounts;
})

export const LineItems = ({items}) => {

  const [data, setData] = React.useState({ nodes: items });

  const handleUpdate = (value, id, property) => {
    
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {

        
        if (node.id === id) {

            if (property === "account") {
                const accountProps = node.account.account
                return {...node, account: { account: value, ...accountProps}}
            } else {
                return { ...node, [property]: value };
            }

        } else {
          return node;
        }
        
      }),
      
    }));
    
  };

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Account</HeaderCell>
              <HeaderCell>Debit</HeaderCell>
              <HeaderCell>Credit</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>
                  <select
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      fontSize: "1rem",
                      padding: 0,
                      margin: 0,
                    }}
                    value={item.account.account}
                    onChange={(event) =>
                      handleUpdate(event.target.value, item.id, "account")
                    }
                  >
                    {accounts.map((a, i) => {
                        return (<option key={i} value={a.account}>{a.account}  {a.name}</option>)
                    })}

                    </select>
                </Cell>
                <Cell>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      fontSize: "1rem",
                      padding: 0,
                      margin: 0,
                    }}
                    value={item.debit}
                    onChange={(event) =>
                      handleUpdate(
                        event.target.value,
                        item.id,
                        "debit"
                      )
                    }
                  />
                </Cell>
                <Cell>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      fontSize: "1rem",
                      padding: 0,
                      margin: 0,
                    }}
                    value={item.credit}
                    onChange={(event) =>
                      handleUpdate(event.target.value, item.id, "credit")
                    }
                  >
                  </input>
                </Cell>

              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};
