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
    DateInput    
} from 'react-admin';
import { useLocation } from 'react-router';
import {LineItems} from './lineItems'
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import {useState, useEffect} from 'react'

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

    return (
        <Box>
            <Create mutationOptions={{ onSuccess }}>
                <SimpleForm>
                    <NumberInput
                        source="entryNumber"
                        fullWidth
                    />
                    <DateInput
                        source="Date"
                        fullWidth
                    />
                    <TextInput
                        source="description"
                        fullWidth
                    />
                </SimpleForm>
            </Create>

            <LineItems lineItems={[]}/>
        </Box>
    );
};

export default EntryCreate;