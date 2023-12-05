import * as React from 'react';
import { useCallback } from 'react';
import {
    List,
    Datagrid,
    TextField,
} from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer} from '@mui/material';
import AccountEdit from './OrganizationEdit';

export const OrganizationList = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const match = matchPath('/organization/:id', location.pathname);

    const handleClose = useCallback(() => {
        navigate('/organization');
    }, [navigate]);

    return (
        <Box display="flex">
            <List
                perPage={25}
                sort={{ field: 'name', order: 'ASC' }}
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
                    isRowSelectable={() => false}
                    rowClick="edit"
                    sx={{
                        '& .column-name': {
                            display: { xs: 'none', md: 'table-cell' },
                        },
                    }}
                >
                    <TextField source="name" />
                </Datagrid>
            </List>
            <Drawer
                variant="persistent"
                open={!!match}
                anchor="right"
                onClose={handleClose}
                sx={{ zIndex: 100 }}
            >
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

export default OrganizationList;