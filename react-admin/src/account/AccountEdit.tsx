import * as React from 'react';
import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    Labeled,
    NumberInput
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/*
import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import { Review } from '../types';
*/
import AccountEditToolbar from './AccountEditToolbar';

interface Props extends EditProps {
    onCancel: () => void;
}

const AccountEdit = ({ id, onCancel }: Props) => {
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
                    toolbar={<AccountEditToolbar />}
                >
                    <NumberInput
                        source="account"
                        fullWidth
                    />
                    <TextInput
                        source="name"
                        fullWidth
                    />
                    <TextInput
                        source="description"
                        fullWidth
                    />
                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default AccountEdit;