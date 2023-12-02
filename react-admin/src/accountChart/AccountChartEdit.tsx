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

const Accounts = ({source}) => {
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
const AccountEdit = ({ id, onCancel }: Props) => {
    const translate = useTranslate();

    return (
        <EditBase id={id}>
            <Box pt={5} width={{ xs: '500vW', sm: 500 }} mt={{ xs: 2, sm: 1 }}>

                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {translate('resources.reviews.detail')}
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

                    <ReferenceArrayInput source="accounts" reference="Account" options={{ fullWidth:true }}>    
                        <AutocompleteArrayInput
                            fullWidth
                            optionText="name"
                            label="Accounts"
                            
                        />
                    </ReferenceArrayInput>

                    <Accounts source="accounts" />

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