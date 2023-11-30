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
import {EntryShow} from "./EntryShow"
import EntryCreate from "./EntryCreate"
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';



const listFilters = [
    <DateInput source="date_gte" alwaysOn />,
    <DateInput source="date_lte" alwaysOn />,
];

export const EntryList = () => {


    return (
        <Box>
            <List
                filters={listFilters}
                perPage={25}
                sort={{ field: 'date', order: 'DESC' }}
            >
                <Datagrid
                    rowClick="expand"
                    expand={<EntryShow />}
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
                    <DateField source="date" />
                    <TextField source="entryNumber" />
                    <NumberField source="description" />
                </Datagrid>
            </List>
        </Box>
    )
}

export default EntryList