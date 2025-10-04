import * as React from 'react';
import { ListBase, useNotify, useRefresh } from 'react-admin';

import { ListLiveUpdate } from '@mattssoft/ra-realtime';
import { DatagridAG } from '@mattssoft/ra-datagrid-ag';
import { Card, CardContent, Stack, Typography, Paper } from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { CreateTransactionAssistantDialog } from './CreateTransactionAssistantDialog';
import { AddTransactionButton } from './AddTransactionButton';
import { ApproveTransactionDialog } from './ApproveTransactionDialog';

export function TransactionList() {
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
    { field: 'date', headerName: 'Date', type: 'date', editable: false },
    { field: 'counterparty', headerName: 'Counterparty', editable: false },
    { field: 'amount', headerName: 'Amount', editable: false },
    { field: 'message', headerName: 'message', type: 'text', editable: false, flex: 4 },
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
            <AddTransactionButton setOpenAssistantDialog={setOpenAssistantDialog} />
          </CardContent>
        </Card>

        {/* Unverified */}
        <Card>
          <CardContent>
            <Typography variant="h6">Transactions</Typography>
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
      </Stack>
      <CreateTransactionAssistantDialog
        handleClose={handleClose}
        openAssistantDialog={openAssistantDialog}
      />
      <ApproveTransactionDialog
        isOpen={open}
        selectedInvoiceId={selectedInvoiceId}
        setOpen={setOpen}
        setSelectedInvoiceId={setSelectedInvoiceId}
        setRecord={setRecord}
      />
    </Paper>
  );
}
