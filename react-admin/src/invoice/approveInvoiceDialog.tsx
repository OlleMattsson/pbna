import { SimpleForm, TextInput, DateInput, useDataProvider } from 'react-admin';
import {
  Toolbar,
  Button,
  Grid,
  Card,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Stack,
} from '@mui/material';
import { EditDialog } from '@mattssoft/ra-form-layout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const ApproveInvoiceDialog = ({
  selectedInvoiceId,
  setOpen,
  setSelectedInvoiceId,
  setRecord,
  isOpen,
}) => {
  const dataProvider = useDataProvider();

  const approvalHandler = (dataProvider) => async () => {
    console.log('approved');

    const invoice = await dataProvider.getOne('Invoice', { id: selectedInvoiceId });

    console.log(invoice.data.verification.id);

    await dataProvider.update('InvoiceVerification', {
      id: invoice.data.verification.id,
      data: { status: 'verified' },
    });
  };

  const approvalHandlerWithDataProvider = approvalHandler(dataProvider);

  return (
    <EditDialog
      resource="Invoice"
      id={selectedInvoiceId}
      isOpen={isOpen}
      title="Approve Invoice"
      fullWidth
      maxWidth="md"
      close={() => {
        setOpen(false);
        setSelectedInvoiceId(null);
        setRecord(null);
      }}
    >
      <SimpleForm
        toolbar={<ApproveInvoiceDialogToolbar onClick={approvalHandlerWithDataProvider} />}
      >
        <Grid container rowSpacing={0} columnSpacing={0}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <DateInput
              source="issue_date"
              fullWidth
              variant="standard"
              size="small"
              sx={{ margin: 0, padding: 0 }}
              margin="dense"
            />
          </Grid>

          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <DateInput
              source="due_date"
              fullWidth
              variant="standard"
              size="small"
              margin="dense"
              sx={{ margin: 0, padding: 0 }}
            />
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: '20px', marginTop: '20px' }}>
            <Divider></Divider>
          </Grid>

          <Grid item xs={5}>
            <TextInput
              source="sender_name"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
            <TextInput
              source="sender_address"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>

          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <TextInput
              source="recipient_name"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
            <TextInput
              source="recipient_address"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: '20px', marginTop: '20px' }}>
            <Divider></Divider>
          </Grid>

          <Grid item xs={12} sx={{ marginBottom: '20px', marginTop: '20px' }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Lines</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <Typography sx={{ marginBottom: '20px' }}>
                    Level up your game with additional invoice line item extraction intelligence,
                    classification and analysis. It can be combined with intelligent inventory
                    tracking.
                  </Typography>

                  <Link href="#" target="_blank">
                    Read more here (opens in new tab!)
                  </Link>

                  <Button
                    sx={{ marginTop: '40px', width: '300px' }}
                    variant="outlined"
                    startIcon={<AutoAwesomeIcon />}
                    endIcon={<AutoAwesomeIcon />}
                  >
                    Upgrade
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <TextInput
              source="subtotal_ex_vat_amount"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={2}>
            <TextInput source="vat_rate" variant="standard" fullWidth size="small" margin="dense" />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              source="vat_amount"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>

          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <TextInput
              source="total_amount"
              variant="standard"
              fullWidth
              size="small"
              margin="dense"
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }}>
              <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                Additional information
              </Typography>
              <Grid item xs={7}>
                <TextInput
                  sx={{ marginBottom: '-20px', padding: 0 }}
                  source="label"
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Grid item xs={7}>
                <TextInput
                  sx={{ marginBottom: '-20px', padding: 0 }}
                  source="description"
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ flex: 1 }}>
          <Grid container></Grid>
        </Paper>
      </SimpleForm>
    </EditDialog>
  );
};

const ApproveInvoiceDialogToolbar = ({ onClick }) => {
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1,
        px: 3,
        pb: 2,
      }}
    >
      <Button variant="contained" onClick={onClick} startIcon={<CheckCircleIcon />}>
        Approve
      </Button>
    </Toolbar>
  );
};
