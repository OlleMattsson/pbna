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
} from 'react-admin';
import { useLocation } from 'react-router';


const AccountCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const location = useLocation();

    const onSuccess = (_: any) => {
        const record = getRecordFromLocation(location);
        notify('ra.notification.created');
        if (record && record.product_id) {
            redirect(`/products/${record.product_id}/reviews`);
        } else {
            redirect(`/reviews`);
        }
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm defaultValues={{ status: 'pending' }}>
                <ReferenceInput source="account" reference="customers">
                    <AutocompleteInput validate={required()} />
                </ReferenceInput>
                <ReferenceInput source="name" reference="products">
                    <AutocompleteInput
                        optionText="reference"
                        validate={required()}
                    />
                </ReferenceInput>

                <TextInput
                    source="description"
                    multiline
                    fullWidth
                    resettable
                    validate={required()}
                />
            </SimpleForm>
        </Create>
    );
};

export default AccountCreate;