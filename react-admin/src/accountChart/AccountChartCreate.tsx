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


const AccountChartCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const location = useLocation();

    const onSuccess = (_: any) => {
        const record = getRecordFromLocation(location);
        notify('ra.notification.created');
        if (record && record.id) {
            redirect(`/accountChart/${record.product_id}`);
        } else {
            redirect(`/accountChart`);
        }
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput
                    source="name"
                    fullWidth
                />
                <TextInput
                    source="description"
                    fullWidth
                />
            </SimpleForm>
        </Create>
    );
};

export default AccountChartCreate;