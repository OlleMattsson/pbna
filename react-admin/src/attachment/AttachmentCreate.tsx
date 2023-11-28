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
    SelectInput    
} from 'react-admin';
import { useLocation } from 'react-router';


const AttachmentCreate = () => {
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
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
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
                <SelectInput source="type" label="Account Type" choices={[
                        { name: 'Asset', id: '0' },
                        { name: 'Liability', id: '1' },
                        { name: 'VAT', id: '2' },
                        { name: 'IncomeStatement', id: '3' },
                        { name: 'Noop', id: '4' },
                ]} />
            </SimpleForm>
        </Create>
    );
};

export default AttachmentCreate;