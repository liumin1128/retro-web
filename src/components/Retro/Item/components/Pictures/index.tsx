import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { isVideo } from '@/utils/common';

interface IPicturesProps {
  pictures: string[];
}

const Pictures: React.FunctionComponent<IPicturesProps> = (props) => {
  const { pictures } = props;

  if (pictures.length === 0) {
    return null;
  }

  if (pictures.length === 1) {
    if (isVideo(pictures[0])) {
      return (
        <video id="playChatVideo" width="100%" controls>
          <source src={pictures[0]} type="video/mp4"></source>
        </video>
      );
    }

    const thumbnail = `${pictures[0]}?imageView2/0/w/400`;

    return (
      <Box sx={{ maxWidth: 400 }}>
        <PhotoProvider>
          <PhotoView src={pictures[0]}>
            <CardMedia
              component="img"
              image={thumbnail}
              sx={{
                width: '100%',
                maxWidth: '400px',
                maxHeight: '400px',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            />
          </PhotoView>
        </PhotoProvider>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <PhotoProvider>
        <Grid container spacing={1}>
          {pictures?.map((picture, index) => {
            const size = 200;
            const thumbnail = `${picture}?imageView2/0/w/${size}`;

            return (
              <Grid key={thumbnail} item xs={4}>
                <PhotoView src={picture}>
                  <CardMedia
                    image={thumbnail}
                    sx={{
                      width: '100%',
                      height: '100%',
                      paddingTop: '100%',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  />
                </PhotoView>
              </Grid>
            );
          })}
        </Grid>
      </PhotoProvider>
    </Box>
  );
};

export default Pictures;
