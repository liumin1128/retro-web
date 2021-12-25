import React, { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
      <Typography sx={{ fontWeight: 'bold', fontSize: 12, color: '#666' }}>
        {count}
      </Typography>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        aria-label="zan"
        size="small"
      >
        <FavoriteIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
      </IconButton>
    </Box>
  );
};

export default Praise;
