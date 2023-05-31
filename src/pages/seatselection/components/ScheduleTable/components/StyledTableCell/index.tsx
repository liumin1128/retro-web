import { styled } from '@mui/material/styles';
import TableCell, {
  tableCellClasses,
  TableCellProps,
} from '@mui/material/TableCell';

interface StyledTableCellProps extends TableCellProps {
  workingDay?: boolean;
  status?: string;
  hasSeat?: boolean;
}

const StyledTableCell = styled(TableCell)<StyledTableCellProps>(
  ({ theme, status, workingDay, hasSeat }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      height: 64,
    },
    [`&.${tableCellClasses.body}`]: {
      borderRight:
        theme.palette.mode === 'dark'
          ? '1px solid rgba(46, 50, 54, 1)'
          : '1px solid rgba(241, 243, 244, 1)',
    },
    minWidth: 64,
    padding: '4px 8px',
    cursor: 'pointer',
    ...(workingDay !== undefined &&
      !workingDay && {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.03)',
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
    ...(hasSeat && {
      backgroundColor: 'green',
      color: 'white',
    }),
  }),
);

export default StyledTableCell;
