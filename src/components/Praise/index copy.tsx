import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ThumbsUpAni } from './canvas';

const randomStr = () => Math.random().toString(36).slice(-6);

interface IPraiseProps {
  test: string;
  onClick: (event: MouseEvent) => void;
}

const Praise: React.FunctionComponent<IPraiseProps> = (props) => {
  const { test, onClick } = props;
  console.log(test);

  const [id] = useState(randomStr());
  const [canvas, setCanvas] = useState();
  // console.log('id');
  // console.log(id);

  // useEffect(() => {}, []);

  function click() {
    onClick();
    if (!canvas) {
      const thumbsUpAni = new ThumbsUpAni(id);
      setCanvas(thumbsUpAni);
      setTimeout(() => {
        thumbsUpAni.start();
      }, 100);
      return;
    }
    canvas.start();
    // setInterval(() => {
    //   thumbsUpAni.start();
    // }, 300);
  }

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100px',
        // border: '1px solid red',

        '& .canvas': {
          // border: '1px solid red',
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
      <canvas className="canvas" id={id} width="200" height="400" />

      <IconButton
        onClick={() => {
          click();
        }}
        aria-label="zan"
        // className="action"
        size="small"
      >
        <ThumbUpIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
      </IconButton>
    </Box>
  );
};

export default Praise;
