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
    SelectInput,    
    DateInput
} from 'react-admin';
import { useLocation } from 'react-router';


const AccountingPeriodCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const location = useLocation();

    const onSuccess = (_: any) => {
        const record = getRecordFromLocation(location);
        notify('ra.notification.created');
        if (record && record.id) {
            redirect(`/accountingPeriod/${record.product_id}`);
        } else {
            redirect(`/accountingPeriod`);
        }
    };

    return (
        <Create mutationOptions={{ onSuccess }}>
            <SimpleForm>
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
            </SimpleForm>
        </Create>
    );
};

export default AccountingPeriodCreate;