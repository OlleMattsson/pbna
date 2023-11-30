import * as React from 'react';
import {
    List,
    Datagrid,
    TextField,
    DateField,
    NumberField,
    BulkDeleteButton
    
} from 'react-admin';
import {EntryShow} from "./EntryShow"
import { Box } from '@mui/material';


const PostBulkActionButtons = () => (
    <>
        <BulkDeleteButton />
    </>
)

export const EntryList = () => {


    return (
        <Box>
            <List
                perPage={25}
                sort={{ field: 'date', order: 'DESC' }}
            >
                <Datagrid
                    bulkActionButtons={<PostBulkActionButtons />}
                    rowClick="expand"
                    expand={<EntryShow />}
                    sx={{
                        '& .column-entryNumber': {
                            display: { xs: 'none', md: 'table-cell' },
                            width: "5vw"
                        },
                        '& .column-date': {
                            display: { xs: 'none', md: 'table-cell' },
                            width: "10vw"
                        },
                        '& .column-description': {
                            display: { xs: 'none', md: 'table-cell' },
                            textAlign: "left"
                        }
                    }}
                >
                    <TextField source="entryNumber" label="Entry"/>
                    <DateField source="date" />
                    <NumberField source="description" />
                </Datagrid>
            </List>
        </Box>
    )
}

export default EntryList