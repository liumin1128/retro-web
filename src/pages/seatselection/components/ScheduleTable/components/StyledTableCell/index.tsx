import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface StyledBoxPropsProps extends BoxProps {
  workingDay?: boolean;
  status?: string;
  hasSeat?: boolean;
}

const StyledTableCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'success' &&
    prop !== 'workingDay' &&
    prop !== 'status' &&
    prop !== 'hasSeat',
})<StyledBoxPropsProps>(({ theme, status, workingDay, hasSeat }) => ({
  minHeight: 32,
  padding: '4px 8px',
  cursor: 'pointer',
  ...(workingDay !== undefined &&
    !workingDay && {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.03)',
    }),
  ...(hasSeat && {
    backgroundColor: 'green',
    color: 'white',
  }),

  ...(status === 'WFH' && {
    backgroundColor: '#0e63b6',
    color: 'white',
  }),
  ...(status === 'AL' && {
    backgroundColor: '#fed563',
    color: 'white',
  }),
  ...(status === 'AM' && {
    backgroundColor: '#fed563',
    color: 'white',
  }),
  ...(status === 'PM' && {
    backgroundColor: '#fed563',
    color: 'white',
  }),
  ...(status === 'MC' && {
    backgroundColor: '#f44336',
    color: 'white',
  }),
}));

export default StyledTableCell;
