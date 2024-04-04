import * as React from 'react';
import {
    SimpleForm,
    Create,
    useNotify,
    useRedirect,
    getRecordFromLocation,
    SaveButton,
    localStorageStore,
} from 'react-admin';
import { useLocation } from 'react-router';
import {LineItems} from './lineItems'
import { Box } from '@mui/material';
import {useState } from 'react'
import {
    EntryNumberInput,
    DescriptionInput,
    CustomDateInput
} from './EntryShow'
import Toolbar from '@mui/material/Toolbar';
import { Fragment } from 'react';
import { createEntry } from './gql';
import { apolloClient as client } from './apolloClient';
import { getAccountingPeriodId } from './queries';



const EntryCreate = () => {    

    const [newEntryId, setNewEntryId] = useState(null)
    const lineItems = []

    
    const notify = useNotify();
    const redirect = useRedirect();
    const location = useLocation();

    const onSuccess = (_: any) => {
        const record = getRecordFromLocation(location);
        notify('ra.notification.created');
        if (record && record.id) {
            redirect(`/entry/${record.product_id}`);
        } else {
            redirect(`/entry`);
        }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    const { id, organization: {id: organizationId} } = user;

    if (id && organizationId) {
        console.log(`user: ${id} org: ${organizationId}`)
        return (
            <Box>
                <Create mutationOptions={{ onSuccess }}>
                    <SimpleForm 
                        toolbar={<EntryCreateToolbar entryId={newEntryId}/>}
                        onSubmit={async (data) =>{
                            const {entryNumber, description, date} = data

                            const accountingPeriodId = await getAccountingPeriodId()

                            client.mutate({
                                mutation: createEntry,
                                variables: {
                                    data: {
                                        createdBy: {
                                            connect: {
                                                id
                                            }
                                        },
                                        owner: {
                                            connect: {
                                                id: organizationId
                                            }
                                        },
                                        accountingPeriod: {
                                            connect: {
                                                id: accountingPeriodId
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
                        />
                    </SimpleForm>
                </Create>
                        
                {newEntryId && 
                    <>
                        <LineItems lineItems={lineItems} entryId={newEntryId}/>
                            <button onClick={() => {
                                notify('ra.notification.updated', {
                                    type: 'info',
                                    messageArgs: { smart_count: 1 },
                                    undoable: true,
                                });
                                redirect('list', 'entry');
                            }}>Save & Close</button>
                    </>
                }
            </Box>
        );
    } 

    return null


};


const EntryCreateToolbar = ({entryId}) => {
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
                    <SaveButton label="Add Lines"/>
                }
            </Fragment>
        </Toolbar>
  
  );
};
export default EntryCreate;