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
    ChipField
} from 'react-admin';
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import AttachmentEdit from './AttachmentEdit';


const listFilters = [
    <DateInput source="date_gte" alwaysOn />,
    <DateInput source="date_lte" alwaysOn />,
];

const AttachmentList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const match = matchPath('/attachment/:id', location.pathname);
    const handleClose = useCallback(() => {
        navigate('/attachment');
    }, [navigate]);

    return (
        <Box display="flex">
            <List
                filters={listFilters}
                perPage={25}
                sort={{ field: 'createdAt', order: 'DESC' }}
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
                    <DateField source="createdAt" />
                    <TextField source="description" />
                    <ChipField source="ocrStatus" />
                    <ChipField source="dataExtractionStatus" />
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
                    <AttachmentEdit
                        id={(match as any).params.id}
                        onCancel={handleClose}
                    />
                )}
            </Drawer>
        </Box>
    )
}


export default AttachmentList