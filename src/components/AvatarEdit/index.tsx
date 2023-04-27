import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ReactAvatarEdit from 'react-avatar-edit';

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
    if (typeof onChange === 'function') {
      onChange('');
    }
  };

  const handleCrop = (base64: string) => {
    setPreview(base64);
    if (typeof onChange === 'function') {
      onChange(base64);
    }
  };

  const handleBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 10000000) {
      alert('File is too big!');
      elem.target.value = '';
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
          width={248}
          height={248}
          onCrop={handleCrop}
          onClose={handleClose}
          onBeforeFileLoad={handleBeforeFileLoad}
          src={src}
          borderStyle={{}}
          labelStyle={{}}
        />
      </Box>

      {preview && <Avatar src={preview} sx={{ width: 128, height: 128 }} />}
      {preview && <Avatar src={preview} sx={{ width: 64, height: 64 }} />}
    </Stack>
  );
});
