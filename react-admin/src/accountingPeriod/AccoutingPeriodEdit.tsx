import * as React from 'react';
import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    EditProps,
    DateInput,
    ReferenceArrayInput,
    ReferenceInput, 
    AutocompleteInput,
    SelectInput
} from 'react-admin';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/*
import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import { Review } from '../types';
*/
import AccountingPeriodEditToolbar from './AccountingPeriodEditToolbar';

interface Props extends EditProps {
    onCancel: () => void;
}

const AccountingPeriodEdit = ({ id, onCancel }: Props) => {
    const translate = useTranslate();
    return (
        <EditBase id={id}>
            <Box pt={5} width={{ xs: '100vW', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {translate('resources.reviews.detail')}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<AccountingPeriodEditToolbar />}
                >

                    <TextInput
                        source="label"
                        fullWidth
                    />
                    <DateInput
                        source="startDate"
                        fullWidth
                    />
                    <DateInput
                        source="endDate"
                        fullWidth
                    />

                    <ReferenceInput 
                        source="accountChart.id" 
                        reference="AccountChart" 
                        options={{ fullWidth:true }
                    }>    
                        <SelectInput
                            fullWidth
                            optionText="name"
                            optionValue="id"
                            label="Chart of Accounts"
                        />
                    </ReferenceInput>

                </SimpleForm>

                    
            </Box>
        </EditBase>
    );
};

export default AccountingPeriodEdit;