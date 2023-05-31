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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.grey[200],
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
    args?: any,
    row?: Record<string, unknown>,
    index?: number,
  ) => React.ReactNode;
}

interface Props {
  columns: Column[];
  data: any[];
  rowKey?: string;
}

export default function CustomizedTables(props: Props) {
  console.log('props');
  console.log(props);
  const { columns, data, rowKey = '_id' } = props;
  return (
    <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <StyledTableCell {...omit(column, ['dataIndex', 'render'])}>
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
                  <StyledTableCell {...omit(column, ['dataIndex', 'render'])}>
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
