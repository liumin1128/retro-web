import * as React from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {
  tableCellClasses,
  TableCellProps,
} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[200],

    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Column extends TableCellProps {
  key: string;
  title?: string;
  dataIndex?: string;
  render?: (
    args?: unknown,
    row?: Record<string, unknown>,
    index?: number,
  ) => React.ReactNode;
}

interface Props {
  columns: Column[];
  data: Record<string, unknown>[];
  rowKey?: string;
}

export default function CustomizedTables(props: Props) {
  console.log('props');
  console.log(props);
  const { columns, data, rowKey = '_id' } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => {
              return (
                <StyledTableCell
                  // align={index !== 0 ? 'right' : undefined}
                  {...omit(column, ['dataIndex', 'render'])}
                >
                  {column.title || column.key}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row[rowKey] as string}>
              {columns.map((column, index) => {
                const dataIndex = column.dataIndex || column.key;
                return (
                  <StyledTableCell
                    // align={index !== 0 ? 'right' : undefined}
                    {...omit(column, ['dataIndex', 'render'])}
                  >
                    {column.render
                      ? column.render(get(row, dataIndex, ''), row, index)
                      : (get(row, dataIndex, '') as string)}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}