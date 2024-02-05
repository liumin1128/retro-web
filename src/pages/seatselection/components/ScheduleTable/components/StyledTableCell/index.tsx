import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface StyledBoxPropsProps extends BoxProps {
  workingDay?: boolean;
  status?: string;
  hasSeat?: boolean;
  holiday?: boolean;
}

const StyledTableCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'success' &&
    prop !== 'workingDay' &&
    prop !== 'status' &&
    prop !== 'hasSeat',
})<StyledBoxPropsProps>(({ theme, status, workingDay, hasSeat, holiday }) => ({
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

  ...(holiday && {
    backgroundColor: '#eb3333',
    color: 'white',
  }),

  ...(hasSeat && {
    backgroundColor: '#389e0d',
    color: 'white',
  }),

  ...(status === 'WFH' && {
    backgroundColor: '#0e63b6',
    color: 'white',
  }),
  ...(status === 'AL' && {
    backgroundColor: '#faad14',
    color: 'white',
  }),
  ...(status === 'AM' && {
    backgroundColor: '#ffc53d',
    color: 'white',
  }),
  ...(status === 'PM' && {
    backgroundColor: '#ffc53d',
    color: 'white',
  }),
  ...(status === 'MC' && {
    backgroundColor: '#ff4d4f',
    color: 'white',
  }),
  ...(status === 'DT' && {
    backgroundColor: '#13c2c2',
    color: 'white',
  }),
  ...(status === 'Other' && {
    backgroundColor: '#d3adf7',
    color: 'white',
  }),
}));

export default StyledTableCell;
