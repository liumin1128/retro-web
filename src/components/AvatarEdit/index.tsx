import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ReactAvatarEdit from 'react-avatar-edit';
// https://github.com/impargo/react-avatar?spm=a2c6h.24755359.0.0.3f383bfd8xwr2A
interface Props {
  defaultValue?: string;
  onChange?: (arg: any) => void;
}

export default forwardRef((props: Props, ref) => {
  const { defaultValue = '', onChange } = props;
  const [preview, setPreview] = useState<string>('');
  const [src] = useState<string>(defaultValue);

  useImperativeHandle(ref, () => ({}));

  const handleClose = () => {
    setPreview('');
    // if (typeof onChange === 'function') {
    //   onChange('');
    // }
  };

  const handleCrop = (base64: string) => {
    setPreview(base64);
    // if (typeof onChange === 'function') {
    //   onChange(base64);
    // }
  };

  const handleBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 10000000) {
      alert('File is too big!');
      elem.target.value = '';
    }
  };

  const handleClickSubmit = () => {
    if (typeof onChange === 'function') {
      onChange(preview);
    }
  };

  return (
    <Stack direction="row" spacing={3}>
      <Box
        sx={{
          border: '1px rgba(0, 0, 0, 0.23) dashed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <ReactAvatarEdit
          imageWidth={248}
          imageHeight={248}
          onCrop={handleCrop}
          onClose={handleClose}
          onBeforeFileLoad={handleBeforeFileLoad}
          src={src}
          borderStyle={{}}
          labelStyle={{}}
          cropRadius={100}
          exportAsSquare
        />
      </Box>

      {preview && (
        <Stack spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={3}>
            <Avatar src={preview} sx={{ width: 128, height: 128 }} />
            <Avatar src={preview} sx={{ width: 64, height: 64 }} />
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleClickSubmit}
            >
              UPDATE AVATAR
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
});
