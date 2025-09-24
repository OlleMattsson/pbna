import { SimpleShowLayout, TextField, DateField } from 'react-admin';
import { ShowDialog } from '@mattssoft/ra-form-layout';

export const ApproveInvoiceDialog = ({
  selectedInvoiceId,
  setOpen,
  setSelectedInvoiceId,
  setRecord,
  isOpen = false,
}) => {
  return (
    <ShowDialog
      resource="Invoice"
      id={selectedInvoiceId}
      isOpen={isOpen}
      title="Invoice Details"
      fullWidth
      maxWidth="md"
      close={() => {
        setOpen(false);
        setSelectedInvoiceId(null);
        setRecord(null);
      }}
    >
      <SimpleShowLayout>
        <TextField source="label" />
        <TextField source="description" />
        <DateField source="issue_date" />
        <DateField source="due_date" />
        <TextField source="sender_name" />
        <TextField source="sender_address" />
        <TextField source="recipient_name" />
        <TextField source="recipient_address" />
        <TextField source="subtotal_ex_vat_amount" />
        <TextField source="vat_amount" />
        <TextField source="total_amount" />
        <TextField source="decimal" />
      </SimpleShowLayout>
    </ShowDialog>
  );
};
