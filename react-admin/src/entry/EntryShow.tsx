import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography, } from '@mui/material';
import { ReferenceField, TextField, useRecordContext, Labeled } from 'react-admin';


const LineItems = ({lineItems}) => {
    console.log(lineItems)

    if (!lineItems.length) return null
    
    return (
        <div>
                     <Grid container spacing={0} columns={3} >
                        <Grid item xs={1} style={{border: "1px solid black"}}>
                                Account
                        </Grid>
                        <Grid item xs={1} style={{border: "1px solid black"}}>
                                Debit
                        </Grid>         
                        <Grid item xs={1} style={{border: "1px solid black"}}>
                                Credit
                        </Grid>                                         
                    </Grid>          
            {lineItems.map((item, index) => {
                return (
                    <Grid container key={index} spacing={0} columns={3} >
                        <Grid item xs={1} style={{border: "1px solid black"}}>
                                {item.account.account} - {item.account.name} 
                        </Grid>
                        <Grid item xs={1} style={{border: "1px solid black"}}>
                                {item.type === "d" && item.amount}
                        </Grid>         
                        <Grid item xs={1} style={{border: "1px solid black"}}>
                                {item.type === "c" && item.amount}
                        </Grid>                                         
                    </Grid>
                    
                )
            })}
            
        </div>
    )

}

export const EntryShow = () => {
    const record = useRecordContext();
    if (!record) return null;

    //console.log(record)
    return (
        <Card sx={{ width: 600}}>
            <CardContent>
                <LineItems lineItems={record.lineItems}/>
            </CardContent >
        </Card>
    );
};

