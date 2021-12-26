import React, { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartAnimation from '@/components/HeartAnimation';
// import styles from './style.css';

interface IPraiseProps {
  count: number;
  onClick: (event: number) => void;
}

const Praise: React.FunctionComponent<IPraiseProps> = (props) => {
  const { count, onClick } = props;
  const [temp, setTemp] = useState(0);

  // const debouncedSave = useCallback(
  //   () => debounce((nextValue: number) => onClick(nextValue), 1000),
  //   [onClick],
  // );

  function saveToDb(nextValue: number) {
    setTemp(0);
    onClick(nextValue);
  }

  const debouncedSave = useRef(
    debounce((nextValue) => saveToDb(nextValue), 1000, {
      maxWait: 1000,
    }),
  ).current;

  function handleClick() {
    setTemp(temp + 1);
    debouncedSave(temp + 1);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 'bold',
          color: 'palette.text.secondary',
        }}
      >
        {count}
      </Typography>

      <HeartAnimation
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleClick();
        }}
      >
        <FavoriteIcon sx={{ fontSize: '20px', margin: 0, color: '#bdbdbd' }} />
      </HeartAnimation>
    </Box>
  );
};

export default Praise;
