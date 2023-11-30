import * as React from 'react';
import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    Labeled,
    NumberInput,
    TextField,
    RichTextField,
    FunctionField
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


/*
import ProductReferenceField from '../products/ProductReferenceField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';
import StarRatingField from './StarRatingField';
import { Review } from '../types';
*/
import AttachmentEditToolbar from './AttachmentEditToolbar';

interface Props extends EditProps {
    onCancel: () => void;
}

const renderDocument = (record) => {
    return record.ocrData.document.map((element, i) => {
        return (<p key={i}>{element.children[0].text}</p>)
    })
}
   

const AttachmentEdit = ({ id, onCancel }: Props) => {
    const translate = useTranslate();
    return (
        <EditBase id={id}>
            <Box pt={5} width={{ xs: '100vW', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {translate('resources.attachments.edit.header')}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<AttachmentEditToolbar />}
                >
                    <TextInput
                        source="name"
                        fullWidth
                    />
                    <TextInput source="description" fullWidth/>

                    <Divider flexItem>Extracted Data</Divider>
                    <TextField label="Extracted Data" source="extractedData"/>

                    <Divider flexItem>Ocr Data</Divider>
                    <FunctionField label="OcrData" render={renderDocument} />

                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default AttachmentEdit;