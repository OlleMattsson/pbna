import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import AssistantIcon from '@mui/icons-material/Assistant';
import CreateIcon from '@mui/icons-material/Create';
import { Button, Popover, Stack } from '@mui/material';

export const AddInvoiceButton = ({ setOpenAssistantDialog }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        startIcon={<AddIcon />}
      >
        Add Invoice
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            width: '250px',
            marginTop: '10px',
            marginBottom: '10px',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
          }}
        >
          <Button
            sx={{ justifyContent: 'flex-start', paddingLeft: '16px' }}
            startIcon={<AssistantIcon />}
            onClick={() => {
              handleClose();
              setOpenAssistantDialog(true);
            }}
          >
            With Assistant
          </Button>

          <Button
            sx={{ justifyContent: 'flex-start', paddingLeft: '16px' }}
            startIcon={<CreateIcon />}
          >
            Manually
          </Button>
        </Stack>
      </Popover>
    </div>
  );
};
