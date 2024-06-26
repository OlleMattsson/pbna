import * as React from 'react';
import { useCallback } from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ReferenceField,
    NumberField,
    DateInput,
    SearchInput,
    TextInput,
    useRecordContext,
    ChipField
} from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';


import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';
import AccountEdit from './AccountEdit';


const listFilters = [
    <TextInput label="Name" source="name"/>,
];

const AccountType = ({source}) => {
    const record = useRecordContext();
    if (!record) return null;

    const data = record[source];

    const map = {
        0: "Asset",
        1: "Liability",
        2: "VAT",
        3: "IncomeStatement",
        4: "Noop"
    }
    
    record.customVatAccountFieldName = map[data]

    return <ChipField source="customVatAccountFieldName" color='primary' />
}

const VATAccount = ({source}) => {
    const record = useRecordContext();
    if (!record) return null;
    const data = record[source];
    
    if (data) return (
        <span>{data.account} - {data.name}</span>
    )
    
    return null
}

export const AccountList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //console.log(location.pathname)
    const match = matchPath('/account/:id', location.pathname);
    const handleClose = useCallback(() => {
        navigate('/account');
    }, [navigate]);

    return (
        <Box display="flex">

            <List
                filters={listFilters}
                perPage={25}
                sort={{ field: 'account', order: 'DESC' }}
                sx={{
                    flexGrow: 1,
                    transition: (theme: any) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginRight: !!match ? '400px' : 0,
                }}
            >
                <Datagrid
                    rowClick="edit"
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
                    <TextField source="account" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <AccountType source="type" />
                    <TextField source="vatAmount" />
                    <VATAccount source="vatAccount" />
                </Datagrid>
            </List>
            <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
            >
                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                {!!match && (
                    <AccountEdit
                        id={(match as any).params.id}
                        onCancel={handleClose}
                    />
                )}
            </Drawer>
        </Box>
    )

};

export default AccountList