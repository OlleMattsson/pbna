import * as React from 'react';
import { ListBase, useNotify, useRefresh } from 'react-admin';
import {
  TextField,
  DateField,
  EditBase,
  SimpleForm,
  TextInput,
  SimpleShowLayout,
} from 'react-admin';

import { ListLiveUpdate } from '@mattssoft/ra-realtime';
import { DatagridAG } from '@mattssoft/ra-datagrid-ag';
import { Card, CardContent, Stack, Typography, Paper } from '@mui/material';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { ShowDialog } from '@mattssoft/ra-form-layout';

import { useTheme } from '@mui/material/styles';

import { CreateInvoiceAssistantDialog } from './createInvoiceAssistantDialog';
import { AddInvoiceButton } from './AddInvoiceButton';

export function InvoiceDashboard() {
  const theme = useTheme();
  const agTheme = theme.palette.mode === 'dark' ? 'ag-theme-balham-dark' : '';
  const notify = useNotify();
  const refresh = useRefresh();

  const onInvoicesEvent = (event: any) => {
    const count = event?.payload?.ids?.length ?? 1;
    notify(`${count} invoice${count === 1 ? '' : 's'} updated elsewhere`, { type: 'info' });
    refresh();
  };

  const [open, setOpen] = React.useState(false);
  const [record, setRecord] = React.useState<any>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = React.useState<string | null>(null);

  const handleRowClicked = React.useCallback((e: RowClickedEvent) => {
    setRecord(e.data); // AG Grid gives you the row data here
    setSelectedInvoiceId(e.data.id);

    setOpen(true);
  }, []);

  const defaultColDef = {
    flex: 1,
  };
  const unverifiedColDefs = [
    { field: 'createdAt', headerName: 'Created At', type: 'date', editable: false },
    { field: 'status', headerName: 'Status', editable: false },
    { field: 'sender_name', headerName: 'Sender', editable: false },
    { field: 'recipient_name', headerName: 'Recipient', editable: false },
    { field: 'description', headerName: 'Descriptuion', type: 'text', editable: false, flex: 4 },
    { field: 'totalAmount', headerName: 'Total', type: 'number', editable: false },
  ];

  const incomingCols = [
    { field: 'due_date', headerName: 'Due Date' },
    { field: 'sender_name', headerName: 'Sender' },
    { field: 'description', headerName: 'Description', type: 'text' },
    { field: 'totalAmount', headerName: 'Total', type: 'number' },
  ];

  const outgoingCols = [
    { field: 'due_date', headerName: 'Due Date' },
    { field: 'recipient_name', headerName: 'Sender' },
    { field: 'description', headerName: 'Description', type: 'text' },
    { field: 'totalAmount', headerName: 'Total', type: 'number' },
  ];

  const [openAssistantDialog, setOpenAssistantDialog] = React.useState(false);
  const handleClose = () => {
    setOpenAssistantDialog(false);
  };

  const invoiceShowFields = [
    'id',
    'createdAt',
    'status',
    'description',
    'due_date',
    'sender_name',
    'recipient_name',
    'total_amount',
  ];
  return (
    <Paper elevation={0}>
      <Stack spacing={3}>
        <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <CardContent>
            <AddInvoiceButton setOpenAssistantDialog={setOpenAssistantDialog} />
          </CardContent>
        </Card>

        {/* Unverified */}
        <Card>
          <CardContent>
            <Typography variant="h6">Unverified</Typography>
            <ListBase
              resource="Invoice"
              filter={{ type: 'unverified' }}
              perPage={25}
              storeKey="invoices.unverified"
              disableSyncWithLocation
            >
              <DatagridAG
                className={`ag-theme-balham ${agTheme}`.trim()}
                columnDefs={unverifiedColDefs}
                defaultColDef={defaultColDef}
                preferenceKey="ag.invoices.unverified"
                sx={{ height: 200 }}
                onRowDoubleClicked={handleRowClicked}
              />
              <ListLiveUpdate onEventReceived={onInvoicesEvent} />
            </ListBase>
          </CardContent>
        </Card>

        {/* Incoming */}
        <Card>
          <CardContent>
            <Typography variant="h6">Incoming</Typography>
            <ListBase
              resource="Invoice"
              filter={{ type: 'incoming' }}
              perPage={25}
              storeKey="invoices.incoming"
              disableSyncWithLocation
            >
              <DatagridAG
                className={`ag-theme-balham ${agTheme}`.trim()}
                columnDefs={incomingCols}
                preferenceKey="ag.invoices.incoming"
                sx={{ height: 200 }}
              />
              <ListLiveUpdate onEventReceived={onInvoicesEvent} />
            </ListBase>
          </CardContent>
        </Card>

        {/* Outgoing */}
        <Card>
          <CardContent>
            <Typography variant="h6">Outgoing</Typography>
            <ListBase
              resource="Invoice"
              filter={{ type: 'outgoing' }}
              perPage={25}
              storeKey="invoices.outgoing"
              disableSyncWithLocation
            >
              <DatagridAG
                className={`ag-theme-balham ${agTheme}`.trim()}
                columnDefs={outgoingCols}
                preferenceKey="ag.invoices.outgoing"
                sx={{ height: 200 }}
              />
              <ListLiveUpdate />
            </ListBase>
          </CardContent>
        </Card>
      </Stack>
      <CreateInvoiceAssistantDialog
        handleClose={handleClose}
        openAssistantDialog={openAssistantDialog}
      />

      <ShowDialog
        resource="Invoice"
        record={record}
        id={selectedInvoiceId}
        isOpen={open}
        title="Invoice Details"
        fullWidth
        maxWidth="md"
        close={() => {
          setOpen(false);
          setSelectedInvoiceId(null);
          setRecord(null);
        }}
        queryOptions={{ meta: { fields: invoiceShowFields } }}
      >
        <SimpleShowLayout>
          <TextField source="id" />
          <DateField source="createdAt" />
          <TextField source="status" />
        </SimpleShowLayout>
      </ShowDialog>
    </Paper>
  );
}
