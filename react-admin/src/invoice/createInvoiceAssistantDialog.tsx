import * as React from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import {
  FileField,
  FileInput,
  SimpleForm,
  Toolbar,
  ToolbarProps,
  useDataProvider,
  useNotify,
} from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';
import { CreateDialog } from '@mattssoft/ra-form-layout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import attachment from '../attachment';

type FileInputItem = {
  rawFile?: File;
  src?: string;
  title?: string;
  [key: string]: unknown;
};

type AssistantDialogToolbarProps = ToolbarProps & {
  onCancel: () => void;
  onProcess: (files: FileInputItem[]) => void;
  processing: boolean;
};

const AssistantDialogToolbar: React.FC<AssistantDialogToolbarProps> = ({
  onCancel,
  onProcess,
  processing,
  sx,
  ...toolbarProps
}) => {
  const { control } = useFormContext();
  const watchedValue = useWatch({ control, name: 'attachmentsComponent' }) as
    | FileInputItem[]
    | undefined;

  const files = React.useMemo<FileInputItem[]>(() => {
    if (!watchedValue) {
      return [];
    }

    return Array.isArray(watchedValue) ? watchedValue : [watchedValue];
  }, [watchedValue]);

  const handleProcess = React.useCallback(() => {
    if (!processing) {
      onProcess(files);
    }
  }, [files, onProcess, processing]);

  const composedSx = React.useMemo(() => {
    const base = {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 1,
      px: 3,
      pb: 2,
    } as const;

    if (!sx) {
      return base;
    }

    return Array.isArray(sx) ? [base, ...sx] : [base, sx];
  }, [sx]);

  const hasFiles = files.length > 0;

  return (
    <Toolbar {...toolbarProps} sx={composedSx}>
      <Button
        variant="contained"
        onClick={handleProcess}
        disabled={!hasFiles || processing}
        startIcon={!processing ? <CloudUploadIcon /> : undefined}
      >
        {processing ? 'Processing...' : 'Process Invoice'}
      </Button>
    </Toolbar>
  );
};

const buildAttachmentPayload = (files: FileInputItem[]) => {
  return {
    data: files
      .filter((item) => item?.rawFile instanceof File)
      .map((item) => ({
        file: {
          upload: item.rawFile,
        },
        name: (item.rawFile as File | undefined)?.name ?? item.title ?? undefined,
      })),
  };
};

type CreateInvoiceAssistantDialogProps = {
  handleClose: () => void;
  openAssistantDialog: boolean;
};

export const CreateInvoiceAssistantDialog: React.FC<CreateInvoiceAssistantDialogProps> = ({
  handleClose,
  openAssistantDialog,
}) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();

  // toggle between form and loading state
  const [loading, setLoading] = React.useState(false);

  const handleDialogClose = React.useCallback(() => {
    setLoading(false);
    handleClose();
  }, [handleClose]);

  const handleProcessFiles = React.useCallback(
    async (files: FileInputItem[]) => {
      if (!files.length) {
        notify('Please select an invoice file to upload.', { type: 'warning' });
        return;
      }

      setLoading(true);

      try {
        const payload = buildAttachmentPayload(files);

        if (!payload.data.length) {
          throw new Error('No valid files to upload');
        }

        const attachmentResponse = await dataProvider.create('Attachment', payload);
        notify('Invoice sent to the assistant.', { type: 'info' });

        console.log(attachmentResponse);

        const attachmentId = attachmentResponse?.data?.attachments[0]?.id || null;

        console.log('Attachment created with id', attachmentId);

        if (attachmentId) {
          // create the invoice, connected to the attachment and the orchestrator

          const invoiceResponse = await dataProvider.create('Invoice', {
            data: {
              attachment: { connect: { id: attachmentId } },
              status: 'pending',
              type: 'unverified',
            },
          });

          console.log('Invoice created', invoiceResponse);

          notify('Invoice created successfully.', { type: 'success' });
        }

        handleDialogClose();
      } catch (error) {
        console.error('Invoice upload failed', error);
        notify('Unable to upload the invoice. Please try again.', { type: 'warning' });
        setLoading(false);
      }
    },
    [dataProvider, handleDialogClose, notify]
  );

  return (
    <CreateDialog
      resource="Invoice"
      title="Invoice Assistant"
      isOpen={openAssistantDialog}
      close={handleDialogClose}
      fullWidth
      maxWidth="md"
    >
      {!loading && (
        <SimpleForm
          toolbar={
            <AssistantDialogToolbar
              onCancel={handleDialogClose}
              onProcess={handleProcessFiles}
              processing={loading}
            />
          }
        >
          <Box sx={{ px: 3, pt: 2 }}>
            <Typography gutterBottom>
              Select an invoice document to process. The assistant will extract the relevant
              information and create a new invoice record for you.
            </Typography>
          </Box>

          <Box sx={{ px: 3, pb: 1 }}>
            <FileInput
              source="attachmentsComponent"
              label="Supported formats: PDF, PNG, JPG"
              multiple={false}
              sx={{ mt: 2 }}
            >
              <FileField source="src" title="title" />
            </FileInput>
          </Box>
        </SimpleForm>
      )}

      {loading && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            gap: 2,
            p: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="body1">Processing your invoice...</Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            You can close this dialog while the invoice is being processed in the background. It
            will appear in the list once it is ready.
          </Typography>
        </Box>
      )}
    </CreateDialog>
  );
};
