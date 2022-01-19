import React, { useState } from 'react';
import remove from 'lodash/remove';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface IUploadPicturesProps {
  onChange: (args: File[]) => void;
}

const UploadPictures: React.FunctionComponent<IUploadPicturesProps> = (
  props,
) => {
  const { onChange } = props;
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (list: File[]) => {
    setFiles(list);
    onChange(list);
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Box sx={{ position: 'relative' }}>
          <Button
            aria-label="Close"
            size="small"
            variant="outlined"
            sx={{
              width: 100,
              height: 100,
              borderRadius: 0,
              borderStyle: 'dashed',
            }}
            // onClick={() => {}}
          >
            <AddIcon fontSize="large" />
          </Button>

          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target?.files && e.target?.files.length > 0) {
                const temp = Array.prototype.slice.call(e.target?.files);
                handleChange([...files, ...temp]);
              }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'red',
              zIndex: 1,
              left: 0,
              right: 0,
              opacity: 0,
            }}
          />
        </Box>
      </Grid>

      {files.map((file, index) => {
        const src = URL.createObjectURL(file);
        return (
          <Grid item key={file.name}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                alt=""
                component="img"
                image={src}
                sx={{ width: 100, height: 100 }}
              />
              <IconButton
                aria-label="Close"
                size="small"
                sx={{
                  borderRadius: 0,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'rgba(255,0,0,0.5)',
                }}
                onClick={() => {
                  const temp = [...files];
                  remove(temp, (_, n) => n === index);
                  handleChange(temp);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UploadPictures;
