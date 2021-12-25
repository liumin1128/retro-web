import React, { useState, useRef } from 'react';
import debounce from 'lodash/debounce';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
        '& .canvas': {
          position: 'absolute',
          bottom: 32,
          pointerEvents: 'none',
          margin: 'auto',
          left: -1000,
          right: -1000,
          width: 200,
          height: 400,
        },
      }}
    >
      <IconButton
        onClick={() => {
          handleClick();
        }}
        aria-label="zan"
        size="small"
      >
        <ThumbUpIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
      </IconButton>
      {count}
      {/* -:{temp} */}
    </Box>
  );
};

export default Praise;
