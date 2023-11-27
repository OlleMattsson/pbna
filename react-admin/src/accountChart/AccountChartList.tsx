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
    ReferenceManyField
} from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';


import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';
import AccountChartEdit from './AccountChartEdit';


export const AccountChartList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //console.log(location.pathname)
    const match = matchPath('/accountChart/:id', location.pathname);
    const handleClose = useCallback(() => {
        navigate('/accountChart');
    }, [navigate]);

    return (
        <>
  
        <Box display="flex">
            <List
                perPage={25}
                sort={{ field: 'name', order: 'ASC' }}
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
                    <TextField source="name"/>
                    <TextField source="description" sortable={false} />


                </Datagrid>
            </List>

        </Box>
        
        <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
            >
                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                {!!match && (
                    <AccountChartEdit
                        id={(match as any).params.id}
                        onCancel={handleClose}
                    />
                )}
            </Drawer>
                </>
    )

};

export default AccountChartList