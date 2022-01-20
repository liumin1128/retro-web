import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import remove from 'lodash/remove';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

interface Item {
  id: string;
  file?: File;
  src?: string;
  url?: string;
}

interface IUploadPicturesProps {
  onChange: (args: Item[]) => void;
  defaultValue?: Item[];
}

export const file2Item = (file: File) => {
  return {
    file,
    id: uuidv4(),
    src: URL.createObjectURL(file),
  };
};

export const url2Item = (url: string) => {
  return {
    id: uuidv4(),
    src: url,
    url,
  };
};

const UploadPictures: React.FunctionComponent<IUploadPicturesProps> = (
  props,
) => {
  const { onChange, defaultValue } = props;
  const [files, setFiles] = useState<Item[]>(defaultValue || []);

  const handleChange = (list: Item[]) => {
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
          >
            <AddIcon fontSize="large" />
          </Button>

          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target?.files && e.target?.files.length > 0) {
                const tempFiles = Array.prototype.slice.call(e.target?.files);
                const tempList = tempFiles.map(file2Item);
                handleChange([...files, ...tempList]);
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

      {files.map((item, index) => {
        return (
          <Grid item key={item.id}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                alt=""
                component="img"
                image={item.src}
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
