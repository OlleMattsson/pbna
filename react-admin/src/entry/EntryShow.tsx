import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography, TableCell, TableContainer, Table, TableHead, TableRow, TableBody} from '@mui/material';
import { ReferenceField, TextField, useRecordContext, Labeled, TextInput, SimpleForm,  } from 'react-admin';
import LineItemEditToolbar from './LineItemEditToolbar';
import Paper from '@mui/material/Paper';
import {LineItems} from './lineItems'


export const EntryShow = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Card sx={{ width: 800}}>
            <CardContent>
                <LineItems items={record.lineItems}/>
            </CardContent >
        </Card>
    );
};

