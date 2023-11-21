import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { isVideo } from '@/utils/common';
import RotatableImage from './RotatableImage';
import NavBottom from './NavBottom';

interface IPicturesProps {
  pictures: string[];
}

const Pictures: React.FunctionComponent<IPicturesProps> = (props) => {
  const { pictures } = props;

  const [focus, setFocus] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleFocus = (newStatus: boolean, index: number) => {
    setFocus(newStatus);
    setCurrent(index);
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const handleNext = () => {
    setCurrent(current + 1);
  };

  if (focus) {
    return (
      <Box>
        <RotatableImage
          src={pictures[current]}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={current > 0}
          hasNext={current < pictures.length - 1}
          onClose={() => {
            handleFocus(!focus, 0);
          }}
        />
        <NavBottom
          pictures={pictures}
          current={current}
          setCurrent={setCurrent}
        />
      </Box>
    );
  }

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
    return (
      <Box sx={{ maxWidth: 400 }}>
        <CardMedia
          component="img"
          image={pictures[0]}
          onClick={() => {
            handleFocus(!focus, 0);
          }}
          sx={{
            width: '100%',
            maxWidth: '400px',
            maxHeight: '400px',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Grid container spacing={1}>
        {pictures?.map((img, index) => {
          return (
            <Grid key={img} item xs={4}>
              <CardMedia
                image={img}
                sx={{
                  width: '100%',
                  height: '100%',
                  paddingTop: '100%',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  handleFocus(!focus, index);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Pictures;
