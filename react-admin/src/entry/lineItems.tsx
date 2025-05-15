import * as React from "react";
import {useState, useEffect} from "react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GET_ACCOUNTS, GET_COA, UPDATE_LINEITEM_ACCOUNT, UPDATE_LINEITEM_DEBCRED, UPDATE_ENTRY_CREATE_LINEITEM } from "./gql";
import { client } from "../dataProviders/apolloClient";

/*
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'include'
});
*/





export const LineItems = ({lineItems, entryId}) => {

  const [data, setData] = React.useState({ nodes: lineItems });
  
  const [selectedOption, setSelectedOption] = useState('blank');

  const [accounts, setAccounts] = useState([])
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const { id: userId, organization: {id: organizationId} } = user;


  useEffect(() => {
    // fetch active accountingPeriods for organization
    // TODO: fetch AccountChart from AccountingPeriod

    client.query({
      query: GET_COA,
      variables:{
        where: {
          owner: {
            id: {
              equals: organizationId
            }
          },
          AND: [
            {
              isActive: {
                equals: true
              }
            }
          ]
        }
      }
    }).then(r => {

      const accountChartId = r.data.accountingPeriods[0].accountChart.id

      client.query({
        query: GET_ACCOUNTS,
        variables: {
            where: {
              id: accountChartId
            }
          }
      }).then( r => {
          const unsortedAccounts = [...r.data.accountChart.accounts]
          const sortedAccounts = unsortedAccounts.sort((a,b) => a.account - b.account)
          setAccounts(sortedAccounts)
      })

    })
  }, []);


  


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

  const handleCreate = (value, property, entryId, lineItemsCount) => {

    const createVars = (property, value, lineItemsCount) => {

      let vars

      // adding accounts
      if (property === "account") {
          vars = [{
              account : {
                  connect: {
                      id: value
                  }
              }
          }]
      } else {    
      
      // updating other props
        vars =  [{
            [property]: value.replace(',', '.')          
        }]
      }

      vars[0].order = lineItemsCount + 1

      return {
        ...vars[0], 
        createdBy: {
          connect: {
              id: userId
          }
        },
        owner: {
          connect: {
            id: organizationId
          }
        }
      }
    } 



    // update db
    client.mutate({
      mutation: UPDATE_ENTRY_CREATE_LINEITEM,
      variables: {
        where: {
            id: entryId
        },
        data:{
          lineItems: {
            create: createVars(property, value, lineItemsCount)
          },

        }
      }
    }).then(r => {
        console.log("UPDATE_ENTRY_CREATE_LINEITEM success", r)

        // graphql includes all lineItems in the response
        // here we use lineItem.order to find the latest id
        const newLineItemId = r.data.updateEntry.lineItems
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .pop()
            .id

        console.log(newLineItemId)

        // now we're ready to update the UI state, i think - same as handleUpdate but without the DB calls


        const updatedNodes = () => {
    
            if (property === "account") {
                return [...data.nodes, {
                    id: newLineItemId,
                    account: {
                        id: value
                    }
                }]
            }

            return [...data.nodes, {
                [property]:value,
                id: newLineItemId
             }]
        }

        const nodes = updatedNodes()

        setData((state) => {
            return {
                ...state,
                nodes
            }
        });
         
    }).catch(e => [
        console.log(e)
    ])

    

  }

  return (
    <Table data={data}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>Delete</HeaderCell>
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
                        <button onClick={() => {
                            
                            /**
                              DELETE LINE ITEM
                             */
                            client.mutate({
                                mutation: gql `
                                    mutation Mutation($where: [LineItemWhereUniqueInput!]!) {
                                        deleteLineItems(where: $where) {
                                        id
                                        }
                                    }
                                `,
                                variables: {
                                    "where": [
                                        {

                                            "id": lineItem.id
                                        }
                                    ]
                                }
                            }).then(r => {
                                const deletedItemId = r.data.deleteLineItems[0].id
                                console.log("DELETE_LINEITEM success", deletedItemId)

                                const updatedNodes = data.nodes.filter(item => item.id !== deletedItemId);
                                setData((state) => {
                                    return {
                                        ...state,
                                        nodes: updatedNodes
                                    }
                                });

                            }).catch(e => [
                                console.log(e)
                            ])



                        }}>X</button>
                        </Cell>
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
                        value={lineItem.debit || ""}
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
                        value={lineItem.credit || ""}
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
            <Row key={Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999}>
                <Cell></Cell>
                <Cell>
                <select
                    value={selectedOption}
                    style={{
                      width: "100%",
                      border: "none",
                      fontSize: "1rem",
                      padding: 0,
                      margin: 0,
                    }}
                    onChange={(event) => {
                        console.log(event)
                        handleCreate(event.target.value, "account", entryId, lineItems.length)
                        setSelectedOption('blank')
                    }}
                  >
                    <option value="blank"></option>
                    {accounts && accounts.map((a, i) => {
                        return (<option key={i} value={a.id}>{a.account}  {a.name}</option>)
                    })}

                    </select>
                </Cell>
                <Cell>
                  <input
                    value={""}
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      fontSize: "1rem",
                      padding: 0,
                      margin: 0,
                    }}
                    onChange={(event) =>
                        console.log("NOT YET IMPLEMENTED")
                    }
                    disabled
                  />
                </Cell>
                <Cell>
                  <input
                    value={""}
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      fontSize: "1rem",
                      padding: 0,
                      margin: 0,
                    }}
                    onChange={(event) =>
                        console.log("NOT YET IMPLEMENTED")
                    }
                    disabled
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
