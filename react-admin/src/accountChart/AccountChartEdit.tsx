import * as React from 'react';
import { useState, useEffect } from 'react';

import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    Labeled,
    NumberInput,
    ReferenceManyField,
    Datagrid,
    TextField,
    Resource,
    useDataProvider,
    List,
    useRecordContext,
    ReferenceArrayInput,
    AutocompleteArrayInput,
    AutocompleteInput,
    NumberField
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import account from "../account"


/*
import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import { Review } from '../types';
*/
import AccountChartEditToolbar from './AccountChartEditToolbar';

interface Props extends EditProps {
    onCancel: () => void;
}

const Accounts3 = ({source}) => {
    const record = useRecordContext();
    if (!record) return null;

    const data = record[source];

    return  (
        <List     
            perPage={25}
            sort={{ field: 'account', order: 'ASC' }}
        >
            <Datagrid data={data} >
                <TextField source="account" sortable={true} />
                <TextField source="name" sortable={false} />
            </Datagrid>
        </List>
    )
}

const Accounts2 = ({source}) => {
    const record = useRecordContext();
    if (!record) return null;
    const nestedData = record[source];

    return (
        <div>
            {nestedData
            .sort((a,b) => a.account - b.account)
            .map((item, index) => {
                return (<div key={index}>
                    <p>
                    <span>{item.account}</span> - 
                    <span>{item.name}</span>
                    </p>

                    { item.vatAccount &&
                        <p>
                            <span>VAT Account</span><br />
                            <span>{item.vatAccount.account}</span> - <span>{item.vatAccount.name}</span> 
                        </p>
                    }
                </div>
                )
            }
            )}
        </div>
    );
}

const Accounts = () => {

    const record = useRecordContext();
    if (!record) return null;

    const sortedAccounts = record.accounts.sort((a, b) => a.account - b.account)
    
    // solution 1: override record, drawback: this affects the entire record
    // this has to be taken into account for other components using the record
    record.accounts = [...sortedAccounts]

            
    return (
        <ReferenceArrayInput source="accounts" reference="Account" options={{ fullWidth:true }}>    
            <AutocompleteArrayInput
                fullWidth
                optionText={(record) => `${record.account} - ${record.name}`}
                optionValue="id"
                label="Accounts"
                parse={(value) => {
                    /*  
                    Parse is run whenever an new item is added to the list of selected items
                    https://marmelab.com/react-admin/AutocompleteArrayInput.html#working-with-object-values 
                    */       
                    if (value) {
                        return value.map(v => ({id: v}))
                    }
                    return []
                }}
                format={(value) => {
                    console.log(value)
                    /*  
                    In order to render selected items, the components needs a list of Ids
                    https://marmelab.com/react-admin/AutocompleteArrayInput.html#working-with-object-values 
                    */                                
                    if (value) {
                        return value.map(v => v.id) 
                    }
                    return                            
                }}
                
            />
        </ReferenceArrayInput>
    )
}

const AccountEdit = ({ id, onCancel }: Props) => {
    const translate = useTranslate();

    // sanitize the linked accounts before sending to data provider
    const sanitizeLinkedTransactions = (data) => ( data.accounts.map(account => ({id: account.id}) ) )
        
    

    // called after submit but before sent to data provider
    const transform = data =>  ({
        ...data,
        accounts: sanitizeLinkedTransactions(data) // {id: "123-234"} 
    })

    return (
        <EditBase 
            id={id}
            transform={transform}
        >
            <Box pt={5} width={{ xs: '500vW', sm: 500 }} mt={{ xs: 2, sm: 1 }}>

                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                            COA Name
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>

                <SimpleForm
                    sx={{ pt: 0, pb: 0, width: '100%' }}
                    toolbar={<AccountChartEditToolbar />}
                >

                    <TextInput
                        source="name"
                        fullWidth
                    />
                    <TextInput
                        source="description"
                        fullWidth
                    />

                    <Accounts />


                    {/* <Accounts2 source="accounts" /> */}

                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default AccountEdit;

/*

                     <ReferenceManyField label="Accounts" reference="accounts" target="id">
                        <Datagrid>
                            <TextField source="title" />
                            <DateField source="published_at" />
                        </Datagrid>
                    </ReferenceManyField>

*/