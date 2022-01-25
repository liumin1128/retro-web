import {
  useState,
  ChangeEvent,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import remove from 'lodash/remove';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const UploadPictures = forwardRef(
  (props: IUploadPicturesProps, ref: ForwardedRef<unknown>) => {
    const { onChange, defaultValue } = props;
    const [files, setFiles] = useState<Item[]>(defaultValue || []);

    const handleChange = (list: Item[]) => {
      setFiles(list);
      onChange(list);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target?.files && e.target?.files.length > 0) {
        const tempFiles = Array.prototype.slice.call(e.target?.files);
        const tempList = tempFiles.map(file2Item);
        handleChange([...files, ...tempList]);
      }
    };

    useImperativeHandle(ref, () => ({
      onChange: handleInputChange,
      reset: () => handleChange([]),
      get: () => files,
    }));

    return (
      <Grid container spacing={1}>
        {files.map((item, index) => {
          return (
            <Grid item key={item.id}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  alt=""
                  component="img"
                  image={item.src}
                  sx={{ width: 64, height: 64 }}
                />
                <IconButton
                  aria-label="Close"
                  size="small"
                  sx={{
                    borderRadius: 0,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 20,
                    height: 20,
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
  },
);

export default UploadPictures;
