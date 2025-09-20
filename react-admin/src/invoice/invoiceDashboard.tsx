import * as React from 'react';
import { ListBase, useNotify, useRefresh } from 'react-admin';
import { ListLiveUpdate } from '@mattssoft/ra-realtime';
import { DatagridAG } from '@mattssoft/ra-datagrid-ag';
import { Card, CardContent, Stack, Typography, Paper } from '@mui/material';
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

  const cols = [
    { field: 'date', headerName: 'Date' },
    { field: 'invoiceNumber', headerName: 'Invoice #', flex: 1 },
    { field: 'description', headerName: 'Descriptuion', type: 'text' },
    { field: 'totalAmount', headerName: 'Total', type: 'number' },
  ];

  const unverifiedColDefs = [
    { field: 'createdAt', headerName: 'Created At' },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'description', headerName: 'Descriptuion', type: 'text' },
    { field: 'totalAmount', headerName: 'Total', type: 'number' },
  ];

  const [openAssistantDialog, setOpenAssistantDialog] = React.useState(false);
  const handleClose = () => {
    setOpenAssistantDialog(false);
  };

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
                preferenceKey="ag.invoices.unverified"
                sx={{ height: 200 }}
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
                columnDefs={cols}
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
                columnDefs={cols}
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
    </Paper>
  );
}
