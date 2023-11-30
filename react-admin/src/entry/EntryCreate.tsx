import * as React from 'react';
import {
    SimpleForm,
    Create,
    ReferenceInput,
    TextInput,
    AutocompleteInput,
    required,
    useNotify,
    useRedirect,
    getRecordFromLocation,
    NumberInput,
    SelectInput,
    DateInput,
    useRecordContext    
} from 'react-admin';
import { useLocation } from 'react-router';
import {LineItems} from './lineItems'
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import {useState, useEffect} from 'react'
import {
    UPDATE_ENTRY_NUMBER, 
    UPDATE_ENTRY_DESCRIPTION, 
    UPDATE_ENTRY_DATE,
    EntryNumberInput,
    DescriptionInput,
    CustomDateInput
} from './EntryShow'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api/graphql'
});

const ENTRY_CREATE = gql`
mutation Mutation($data: EntryCreateInput!) {
    createEntry(data: $data) {
      id
    }
  }
`

// create entry and retrieve ID

// TODO: user should be logged in user
const createdByUserId = "2ca63449-b1d7-491c-8093-94c79f40e2d3"

const EntryCreate = () => {    
    
    const [newEntryId, setNewEntryId] = useState(null)
    const lineItems = []


    useEffect(() => {
        const initEntry = async () => {
            await client.mutate({
                mutation: ENTRY_CREATE,
                variables: {
                    data: {
                      createdBy: {
                        connect: {
                          id: createdByUserId // admin@mattssoft.com
                        }
                      }
                    }
                  }
            }).then(r => {
                const id = r.data.createEntry.id
                setNewEntryId(id)
            })
        }

        initEntry()
    }, [])

    const notify = useNotify();
    const redirect = useRedirect();
    const location = useLocation();

    const onSuccess = (_: any) => {
        const record = getRecordFromLocation(location);
        notify('ra.notification.created');
        if (record && record.id) {
            redirect(`/account/${record.product_id}`);
        } else {
            redirect(`/account`);
        }
    };

    if (newEntryId !== null) {

        return (
            <Box>
                <Create mutationOptions={{ onSuccess }}>
                    <SimpleForm 
                        toolbar={null}
                    >
                            <EntryNumberInput 
                                fullWidth
                                source="entryNumber"
                                onBlur={(e) => {
                                    client.mutate({
                                        mutation: UPDATE_ENTRY_NUMBER,
                                        variables: {
                                            where: {
                                                id: newEntryId
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
                            <CustomDateInput 
                                source="date" 
                                onBlur={e => {
                                    client.mutate({
                                        mutation: UPDATE_ENTRY_DATE,
                                        variables: {
                                            where: {
                                                id: newEntryId
                                            },
                                            data: {
                                                date: e.target.value
                                            },
                                            updateLineItemsData: lineItems.map(item => ({
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
                <DescriptionInput 
                    source="description" 
                    fullWidth 
                    onBlur={e => {
                        client.mutate({
                            mutation: UPDATE_ENTRY_DESCRIPTION,
                            variables: {
                                where: {
                                  id: newEntryId
                                },
                                data: {
                                      description: e.target.value
                                },
                                updateLineItemsData: lineItems.map(item => ({
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
                    </SimpleForm>
                </Create>
    
                <LineItems lineItems={lineItems} entryId={newEntryId}/>
            </Box>
        );
    }

    return null
};

export default EntryCreate;