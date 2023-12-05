import * as React from 'react';
import { useCallback } from 'react';
import {
    List,
    Datagrid,
    TextField,
    TextInput,
    DateField,
    ChipField,
    useRecordContext
} from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';


import { Box, Drawer} from '@mui/material';
import AccountEdit from './AccoutingPeriodEdit';


const listFilters = [
    <TextInput label="Name" source="name"/>,
];

const IsActive = ({source}) => {
    const record = useRecordContext();
    if (!record) return null;

    const isActive = record[source];

    record.customCoaActiveLabel = "yes"

    if(isActive) {
        return <ChipField source="customCoaActiveLabel" color='success' label="yes"/>
    }
    return null

}

export const AccountingPeriodList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //console.log(location.pathname)
    const match = matchPath('/accountingPeriod/:id', location.pathname);
    const handleClose = useCallback(() => {
        navigate('/accountingPeriod');
    }, [navigate]);

    return (
        <Box display="flex">

            <List
                filters={listFilters}
                perPage={25}
                sort={{ field: 'label', order: 'ASC' }}
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
                        }
                    }}
                >
                    <TextField source="label" label="Period Name" />
                    <IsActive source="isActive" label="Active"/>
                    <DateField source="startDate" label="Start Date" />
                    <DateField source="endDate" label="End Date" />
                    <TextField source="accountChart.name" label="CoA" />
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

export default AccountingPeriodList;