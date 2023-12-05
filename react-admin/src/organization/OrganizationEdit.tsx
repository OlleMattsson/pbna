import * as React from 'react';
import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    EditProps,
} from 'react-admin';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OrganizationEditToolbar from './OrganizationEditToolbar';

interface Props extends EditProps {
    onCancel: () => void;
}

const OrganizationEdit = ({ id, onCancel }: Props) => {
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
                    toolbar={<OrganizationEditToolbar />}
                >

                    <TextInput
                        source="name"
                        fullWidth
                    />
                    <TextInput
                        source="addressStreet"
                        fullWidth
                    />
                    <TextInput
                        source="addressPostalCode"
                        fullWidth
                    />
                    <TextInput
                        source="addressCity"
                        fullWidth
                    />
                    <TextInput
                        source="addressCountry"
                        fullWidth
                    />
                    <TextInput
                        source="phone"
                        fullWidth
                    />
                    <TextInput
                        source="email"
                        fullWidth
                    />
                    <TextInput
                        source="website"
                        fullWidth
                    />
                    <TextInput
                        source="businessID"
                        fullWidth
                    />
                    <TextInput
                        source="vatNumber"
                        fullWidth
                    />


                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default OrganizationEdit;