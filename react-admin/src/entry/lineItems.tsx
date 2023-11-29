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
                id
                account
                name
            }
        }
    }       
`;

const UPDATE_LINEITEM_ACCOUNT = gql`
    mutation Mutation($where: LineItemWhereUniqueInput!, $data: LineItemUpdateInput!) {
        updateLineItem(where: $where, data: $data) {
            id
            account {
                id
            }
        }
    }
`

const UPDATE_LINEITEM_DEBCRED = gql`
    mutation Mutation($where: LineItemWhereUniqueInput!, $data: LineItemUpdateInput!) {
        updateLineItem(where: $where, data: $data) {
            id
            debit
            credit
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

export const LineItems = ({lineItems}) => {

  const [data, setData] = React.useState({ nodes: lineItems });

  const handleUpdate = (newValue, lineItemId, property) => {
    
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {

        
        if (node.id === lineItemId) {

            // UPDATE DB 

            // ACCOUNT
            if (property === "account") {
                client.mutate({
                    mutation: UPDATE_LINEITEM_ACCOUNT,
                    variables: {
                        "where": {
                          "id": lineItemId
                        },
                        "data": {
                          "account": {
                            "connect": {
                              "id": newValue
                            }
                          }
                        }
                      }
                }).then(r => {
                    console.log("UPDATE_LINEITEM_ACCOUNT success", r)
                }).catch(e => [
                    console.log(e)
                ])

                const accountProps = node.account.account
                return {...node, account: { account: newValue, ...accountProps}}
            } else {

            // DEBIT & CREDIT
            client.mutate({
                mutation: UPDATE_LINEITEM_DEBCRED,
                variables: {
                    "where": {
                      "id": lineItemId
                    },
                    "data": {
                        [property]: newValue.replace(',', '.')              
                    }
                  }
            }).then(r => {
                console.log("UPDATE_LINEITEM_ACCOUNT success", r)
            }).catch(e => [
                console.log(e)
            ])

                return { ...node, [property]: newValue };
            }

        } else {
          return node;
        }
        
      }),
      
    }));
  };

  const handleCreate = (value, property) => {
    return
  }

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
            {tableList.sort((a,b)=> a.order - b.order).map((lineItem) => {
                return (
                  <Row key={lineItem.id}>
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
                        value={lineItem.account.id}
                        onChange={(event) =>
                          handleUpdate(event.target.value, lineItem.id, "account")
                        }
                      >
                        {accounts.map((a, i) => {
                            return (<option key={i} value={a.id}>{a.account}  {a.name}</option>)
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
                        value={lineItem.debit}
                        onChange={(event) =>
                          handleUpdate(
                            event.target.value,
                            lineItem.id,
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
                        value={lineItem.credit}
                        onChange={(event) =>
                          handleUpdate(event.target.value, lineItem.id, "credit")
                        }
                      >
                      </input>
                    </Cell>
    
                  </Row>
                )
            } 
            )}
            <Row key={9999}>
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
                    onChange={(event) => {
                        console.log(event)
                        handleCreate(event.target.value, "account")
                    }}
                  >
                    <option></option>
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
                    onBlur={(event) =>
                        console.log(event)
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
                    onBlur={(event) =>
                        console.log(event)                    }
                  >
                  </input>
                </Cell>                                
            </Row>
          </Body>
        </>
      )}
    </Table>
  );
};
