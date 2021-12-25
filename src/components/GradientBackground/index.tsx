import * as React from 'react';
import Box from '@mui/material/Box';

interface IBGProps {
  children: React.ReactElement;
  focus: boolean;
  blur: boolean;
  // status: string;
}

const BG: React.FunctionComponent<IBGProps> = (props) => {
  const { children, focus, blur } = props;

  const style = focus
    ? {
        background: 'red',
        p: '4px',
        m: '-4px',
        borderRadius: '11px',
        animation: 'animatedgradient 6s ease alternate infinite',
        backgroundSize: '300% 300%',
        backgroundImage:
          'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)',

        '@keyframes animatedgradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      }
    : {};

  return (
    <Box
      sx={{
        p: focus ? '4px' : '4px',
        pointerEvents: blur ? 'none' : '',
        opacity: blur ? 0.3 : 1,
        cursor: blur ? 'wait' : 'pointer',
      }}
    >
      <Box
        sx={{
          ...style,
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            // background: 'hsl(222.8571428571deg 13.7254901961% 20%)',
            // bgcolor: status === 'CLOSED' ? '#ffffff' : '#ffffff',
            borderRadius: '8px',
            p: focus ? '16px' : '16px',
            // color: '#fff',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BG;
