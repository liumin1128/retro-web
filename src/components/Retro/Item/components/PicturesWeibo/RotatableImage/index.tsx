/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Toolbar from './Toolbar';
import Marsk from './Marsk';

const Img = styled('img')(() => ({
  display: 'block',
  width: '100%',
  '&:hover': {
    cursor: 'zoom-out', // zoom-out;
  },
}));

const trans = {
  '0': 'rotate(0deg) translate(0px, 0px)',
  '90': 'rotate(90deg) translate(0px, -100%)',
  '180': 'rotate(180deg) translate(-100%, -100%)',
  '270': 'rotate(270deg) translate(-100%, 0px)',
  '-90': 'rotate(-90deg) translate(-100%, 0px)',
  '-180': 'rotate(-180deg) translate(-100%, -100%)',
  '-270': 'rotate(-270deg) translate(0px, -100%)',
};

interface IRotatableImageProps {
  src: string;
  onPrev: (index: number) => void;
  onNext: (index: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
}

const RotatableImage: React.FunctionComponent<IRotatableImageProps> = (
  props,
) => {
  const { src, onClose, onPrev, onNext, hasPrev, hasNext } = props;
  const imgRef = useRef<HTMLImageElement>();
  const [rotated, setRotated] = useState(false);
  const [deg, setDeg] = useState(0);

  const w = imgRef.current?.width;
  const h = imgRef.current?.height;

  const rotatedStyle = rotated
    ? {
        height: 0,
        transition: 'padding-top .25s ease-out',
        paddingTop:
          (deg / 90) % 2 !== 0 ? `${(w / h) * 100}%` : `${(h / w) * 100}%`,
      }
    : {};

  const imgRatatedStyle = rotated
    ? {
        transformOrigin: 'left top',
        position: 'absolute',
        top: 0,
        left: 0,
        width: (deg / 90) % 2 !== 0 ? `${(w / h) * w}px` : '100%',
        transform: trans[`${deg}`],
      }
    : {};

  const handleRotate = (v: number) => {
    setDeg((deg + v) % 360);
  };

  const handleView = () => {
    window.open(src, '_blank');
  };

  const handleRotateLeft = () => {
    setRotated(true);
    handleRotate(-90);
  };

  const handleRotateRight = () => {
    setRotated(true);
    handleRotate(90);
  };

  console.log('hasNext');
  console.log(hasNext);
  console.log('hasPrev');
  console.log(hasPrev);

  return (
    <Box>
      <Toolbar
        onClose={onClose}
        onView={handleView}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
      />
      <Marsk
        onNext={onNext}
        onPrev={onPrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onClose={onClose}
      >
        <Box
          sx={{
            position: 'relative',
            ...rotatedStyle,
          }}
        >
          <Img ref={imgRef} src={src} alt="" sx={imgRatatedStyle} />
        </Box>
      </Marsk>
    </Box>
  );
};

export default RotatableImage;
