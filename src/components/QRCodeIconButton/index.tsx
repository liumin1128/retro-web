import * as React from 'react';
import copy from 'copy-to-clipboard';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import QRCode from 'qrcode.react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/QrCode';
import Box from '@mui/material/Box';

export default function BasicPopover({ content }: { content: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick} color="inherit">
        <PhotoCamera />
      </IconButton>

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
        <Box p={1} sx={{ bgcolor: '#fff' }}>
          <Stack direction="column" spacing={1}>
            <QRCode
              id={content}
              value={content}
              size={200}
              // bgColor="rgba(255,255,255,0)"
              // fgColor="#ffffff" //二维码的颜色
            />
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                copy(content);
              }}
            >
              copy to clipboard
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
