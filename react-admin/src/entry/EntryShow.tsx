import * as React from 'react';
import { Box, 
    Card, 
    CardContent,
    Grid
} from '@mui/material';

import { 
    useRecordContext, 
    DateInput,
    SimpleForm,
    TextInput,
    TextField,
    useInput
} from 'react-admin';
import LineItemEditToolbar from './LineItemEditToolbar';
import Paper from '@mui/material/Paper';
import {LineItems} from './lineItems'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
});

// hardcoded accountchart for now
const accountChart = "0c0fc14c-3fe1-4ade-a898-37361947ee63"

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


const EntryNumberInput = ({ source, label, onBlur }) => {
    const { id, field, fieldState } = useInput({ source, onBlur });
    delete field.ref
    return (
        <TextInput {...field}/>
    )
};


const DescriptionInput = ({ source, label, onBlur }) => {
    const { id, field, fieldState } = useInput({ source, onBlur });
    delete field.ref
    return (
        <TextInput {...field}/>
    )
};

export const EntryShow = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Card sx={{ width: 800}}>
            <CardContent>
                <SimpleForm onSubmit={(data) => {
                    console.log(data)
                }}>
                                <TextField source="id" />

                    <Grid container columns={2} spacing={2}>
                        <Grid item xs={1}  >
                            <EntryNumberInput 
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
                            <DateInput source="date" />
                        </Grid>
                    </Grid>
                <DescriptionInput 
                    source="description" 
                    fullWidth 
                    onBlur={e => {

                        // only works for two line items atm - line item
                        // data variables has to be created dyynamically

                        client.mutate({
                            mutation: UPDATE_ENTRY_DESCRIPTION,
                            variables: {
                                where: {
                                  id: record.id
                                },
                                data: {
                                      description: e.target.value
                                },
                                updateLineItemsData: [
                                  {
                                    where: {
                                      id: record.lineItems[0].id
                                    },
                                    data: {
                                      description: e.target.value
                                    }
                                  },
                                { 
                                    where: {
                                      id: record.lineItems[1].id
                                    },
                                    data: {
                                      description: e.target.value
                                    }
                                  }    
                                ]
                              }
                        }).then( r => {
                            console.log(r)
                        })      
                    }}
                />
                </SimpleForm>
                <LineItems items={record.lineItems}/>
            </CardContent >
        </Card>
    );
};

