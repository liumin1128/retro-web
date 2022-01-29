import React from 'react';
import Box from '@mui/material/Box';

interface IUploadPicturesProps {
  onChange: (e: unknown) => void;
  children: React.ReactNode;
}

const UploadPictures: React.FunctionComponent<IUploadPicturesProps> = (
  props,
) => {
  const { onChange, children } = props;

  return (
    <Box sx={{ position: 'relative', display: 'flex', overflow: 'hidden' }}>
      {children}

      <input
        type="file"
        multiple
        onChange={onChange}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'red',
          zIndex: 1,
          left: 0,
          right: 0,
          opacity: 0,
          cursor: 'pointer',
          border: '1px solid red',
        }}
      />
    </Box>
  );
};

export default UploadPictures;
