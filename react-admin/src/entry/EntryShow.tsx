import * as React from 'react';
import { 
    Card, 
    CardContent,
    Grid,
    Box
} from '@mui/material';

import { 
    useRecordContext, 
    DateInput,
    SimpleForm,
    TextInput,
    useInput,
} from 'react-admin';
import {LineItems} from './lineItems'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { client } from '../dataProviders/apolloClient';

/*
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
});
*/

const UPDATE_ENTRY_NUMBER = gql`
mutation Mutation($where: EntryWhereUniqueInput!, $data: EntryUpdateInput!) {
    updateEntry(where: $where, data: $data) {
      description
      id
    }
  }   
`

const UPDATE_ENTRY_DESCRIPTION = gql`
mutation Mutation($where: EntryWhereUniqueInput!, $data: EntryUpdateInput!, $updateLineItemsData: [LineItemUpdateArgs!]!) {
    updateEntry(where: $where, data: $data) {
      description
      id
      
    }
    updateLineItems(data: $updateLineItemsData) {
      description
      id
    }
  } 
`
const UPDATE_ENTRY_DATE = gql`
mutation Mutation($where: EntryWhereUniqueInput!, $data: EntryUpdateInput!, $updateLineItemsData: [LineItemUpdateArgs!]!) {
    updateEntry(where: $where, data: $data) {
      date
      id
    }
    updateLineItems(data: $updateLineItemsData) {
      date
      id
    }
  }
`

export const EntryNumberInput = ({ source, label, onBlur }) => {
    const { id, field, fieldState } = useInput({ source, onBlur });
    delete field.ref
    return  <TextInput label={label}  {...field} style={{width: "px"}}/>
};


export const DescriptionInput = ({ source, label, onBlur }) => {
    const { id, field, fieldState } = useInput({ source, onBlur });
    delete field.ref
    return <TextInput label={label} {...field} style={{width: "100%"}}
    />
};

export const CustomDateInput = ({ source, label, onBlur }) => {
    const { id, field, fieldState } = useInput({ source, onBlur });
    delete field.ref
    return <DateInput label={label} {...field}/>
};

export const EntryShow = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Card sx={{ width: 800}}>
            <CardContent>
                <SimpleForm 
                    toolbar={null}>
                    <Grid container columns={2} spacing={2}>
                        <Grid item xs={1}  >
                            <EntryNumberInput 
                                label="Entry Number"
                                fullWidth
                                source="entryNumber"
                                onBlur={(e) => {
                                    client.mutate({
                                        mutation: UPDATE_ENTRY_NUMBER,
                                        variables: {
                                            where: {
                                                id: record.id
                                            },
                                            data: {
                                                entryNumber: parseInt(e.target.value)
                                            }
                                        }
                                    }).then( r => {
                                        console.log(r)
                                    })                                                         
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} style={{textAlign: 'right'}}>
                            <CustomDateInput 
                                source="date" 
                                label="Transaction Date"
                                onBlur={e => {
                                    client.mutate({
                                        mutation: UPDATE_ENTRY_DATE,
                                        variables: {
                                            where: {
                                                id: record.id
                                            },
                                            data: {
                                                date: e.target.value
                                            },
                                            updateLineItemsData: record.lineItems.map(item => ({
                                                where: {
                                                    id: item.id
                                                },
                                                data: {
                                                    date: e.target.value
                                                }
                                            }))                                            
                                        }
                                    }).then( r => {
                                        console.log(r)
                                    })  
                                }}
                            />
                        </Grid>
                    </Grid>
                <Grid container columns={1}>
                    <Grid item xs={12}>

                <DescriptionInput 
                    source="description" 
                    fullWidth
                    label="Description"
                    onBlur={e => {
                        client.mutate({
                            mutation: UPDATE_ENTRY_DESCRIPTION,
                            variables: {
                                where: {
                                  id: record.id
                                },
                                data: {
                                      description: e.target.value
                                },
                                updateLineItemsData: record.lineItems.map(item => ({
                                    where: {
                                        id: item.id
                                    },
                                    data: {
                                        description: e.target.value
                                    }
                                    }
                                ))
                              }
                        }).then( r => {
                            console.log(r)
                        })      
                    }}
                />
                                    </Grid>

                </Grid>

                </SimpleForm>
                <LineItems lineItems={record.lineItems} entryId={record.id}/>
            </CardContent >
        </Card>
    );
};

