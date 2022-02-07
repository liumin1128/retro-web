import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import * as React from 'react';

interface IMarskProps {
  onClose: () => void;
  onNext: (index: number) => void;
  onPrev: (index: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  children: ReactNode;
}

const Marsk: React.FunctionComponent<IMarskProps> = (props) => {
  const { children, onNext, onPrev, hasNext, hasPrev, onClose } = props;
  return (
    <Box sx={{ position: 'relative' }} onClick={onClose}>
      {children}

      {hasNext && (
        <Box
          sx={{
            position: 'absolute',
            width: '30%',
            height: '100%',
            right: 0,
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            cursor:
              'url(https://imgs.react.mobi/FiQd_o8R1l4e-vtnDb2l_WkDGBRT),auto',

            opacity: 0,
            // '&:hover': {
            //   opacity: 1,
            // },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        />
      )}

      {hasPrev && (
        <Box
          sx={{
            position: 'absolute',
            width: '30%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            cursor:
              'url(https://imgs.react.mobi/Fsf7mnTtolDXXD82po62XUgdKGK5),auto',
            opacity: 0,
            // '&:hover': {
            //   opacity: 1,
            // },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        />
      )}
    </Box>
  );
};

export default Marsk;
