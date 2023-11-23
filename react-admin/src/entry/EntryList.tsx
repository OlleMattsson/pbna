import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    DateInput,
} from 'react-admin';

const listFilters = [
    <DateInput source="date_gte" alwaysOn />,
    <DateInput source="date_lte" alwaysOn />,
];

export const EntryList = () => (
    <List
        filters={listFilters}
        perPage={25}
        sort={{ field: 'date', order: 'DESC' }}
    >
        <Datagrid
            rowClick="expand"
            sx={{
                '& .column-customer_id': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-total_ex_taxes': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-delivery_fees': {
                    display: { xs: 'none', md: 'table-cell' },
                },
                '& .column-taxes': {
                    display: { xs: 'none', md: 'table-cell' },
                },
            }}
        >
            <TextField source="id" />
            <DateField source="date" />
            <NumberField source="description" />
        </Datagrid>
    </List>
);

