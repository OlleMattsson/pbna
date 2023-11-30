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
    useRecordContext,
    SaveButton,
    
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
import Toolbar from '@mui/material/Toolbar';
import { Fragment } from 'react';


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
   //const newEntryId = ""
    const lineItems = []

/*
    useEffect(() => {
        console.log('Component mounted');
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
                //setNewEntryId(id)
            })
        }
        initEntry()
        return () => {
            console.log('Component will unmount');
            // Perform cleanup actions here, if needed
          };
    }, [])
    */


    
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

        return (
            <Box>
                <Create mutationOptions={{ onSuccess }}>
                    <SimpleForm 
                        toolbar={<EntryCreateToolbar entryId={newEntryId}/>}
                        onSubmit={(data) =>{
                            const {entryNumber, description, date} = data
                            client.mutate({
                                mutation: ENTRY_CREATE,
                                variables: {
                                    data: {
                                        createdBy: {
                                            connect: {
                                                id: createdByUserId // admin@mattssoft.com
                                            }
                                        },
                                        entryNumber: parseInt(entryNumber),
                                        description,
                                        date
                                    }
                                }
                            }).then(r => {
                                const id = r.data.createEntry.id
                                setNewEntryId(id)
                            })
                        }}
                    >
                        <EntryNumberInput 
                            fullWidth
                            source="entryNumber"
                            label="Entry Number"
  
                        />
                        <CustomDateInput 
                            source="date" 
                            label="Transaction Date"

                        />
                        <DescriptionInput 
                            source="description" 
                            label="Description"
                            fullWidth 
                        />
                    </SimpleForm>
                </Create>
                        
                {newEntryId && 
                    <LineItems lineItems={lineItems} entryId={newEntryId}/>
                }
            </Box>
        );
        

};


const EntryCreateToolbar = ({entryId}) => {
const redirect = useRedirect();
const notify = useNotify();
    return (
        <Toolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: { sm: 0 },
            }}
        >
            <Fragment>
                {!entryId &&
                <SaveButton
                    mutationOptions={{
                        onSuccess: () => {
                            notify('ra.notification.updated', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: true,
                            });
                            //redirect('list', 'account');
                        }
                    }}
                />
                }

            </Fragment>
        </Toolbar>
  
  );
};
export default EntryCreate;