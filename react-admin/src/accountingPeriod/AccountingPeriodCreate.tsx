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
    DateInput,
    BooleanInput
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
                <NumberInput source="vatReportingDate" label="VAT Reporting Date"/>
                <NumberInput source="vatReportingFrequency" label="VAT Reporting frequency"/>
                <BooleanInput label="Active" source="isActive" />

            </SimpleForm>
        </Create>
    );
};

export default AccountingPeriodCreate;