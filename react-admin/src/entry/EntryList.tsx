import * as React from 'react';
import {useEffect, useState} from 'react';
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
import { getAccountingPeriodId } from './queries';


const PostBulkActionButtons = () => (
    <>
        <BulkDeleteButton />
    </>
)

// Entry list displays entries only in the active accounting period
// The id for the accounting period is fetched here in typical react fashion and 
// passed into the filter prop of the <List>
const WithAccountingPeriodId = (props) => {
    const [accountingPeriodId, setAccountingPeriodId] = useState(null)

    // helper function for async data access using the custom graphql api
    async function fetchAccountingPeriodId() {
        const id = await getAccountingPeriodId()
        setAccountingPeriodId(id)
    }

    useEffect( () => {
        fetchAccountingPeriodId()
    }, [])


    if (!accountingPeriodId) return null

    return <EntryList accountingPeriodId={accountingPeriodId}/>
}

export const EntryList = ({accountingPeriodId}) => {
    return (
            <Box>
                <List
                    perPage={25}
                    sort={{ field: 'date', order: 'DESC' }}
                    filter={{accountingPeriod: accountingPeriodId}}
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

export default WithAccountingPeriodId
