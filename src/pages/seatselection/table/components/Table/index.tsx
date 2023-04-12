import * as React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getMonthDays } from '@/utils/common';
import Popover from '@/components/Popover';
import { UserFieldsFragment } from '@/generated/graphql';
import useSeats from '../../../hooks/useSeats';
import { SEAT_LIST } from './data';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 64,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontweight: 'bold',
    borderRight: '1px rgba(0,0,0,0.1) solid',
  },
  padding: 0,
  width: 32,
  height: 32,
  cursor: 'pointer',
  '& .avatar': {
    width: 32,
    height: 32,
    margin: 0,
    display: 'flex',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface Props {
  startDate: number;
  endDate: number;
}

const UserAvatar = ({ user }: { user: UserFieldsFragment }) => {
  return (
    <Tooltip
      title={user?.nickname}
      disableFocusListener
      disableTouchListener
      placement="top"
      arrow
    >
      <Avatar
        sx={{ width: 32, height: 32, borderRadius: 0 }}
        src={user?.avatarUrl || ''}
      />
    </Tooltip>
  );
};

export default function CustomizedTables({ startDate, endDate }: Props) {
  const days = getMonthDays(dayjs(startDate).format('YYYY-MM'));

  const { data, selectSeat, cancelSelectSeat, userInfo } = useSeats({
    startDate,
    endDate,
  });

  const rows = SEAT_LIST.map((i) => {
    const obj = {
      key: `#${i.id}`,
      _id: i._id,
    } as { [key: string]: unknown };

    // eslint-disable-next-line array-callback-return
    days.map((day) => {
      const cur = data?.list?.find(
        (j) =>
          j?.seat?._id === i._id &&
          dayjs(j.date).format('D') === day.format('D'),
      );
      if (cur) {
        obj[day.format('D')] = cur.user;
      }
    });
    return obj;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" sx={{ width: 48 }}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontweight: 'bold',
                }}
              >
                {dayjs(startDate).format('MMM')}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontStyle: 'italic',
                }}
              >
                {dayjs(startDate).format('YYYY')}
              </Typography>
            </StyledTableCell>
            {days.map((day) => {
              return (
                <StyledTableCell align="center" key={day.unix()}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontStyle: 'italic',
                    }}
                  >
                    {day.format('ddd')}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontweight: 'bold',
                    }}
                  >
                    {day.format('DD')}
                  </Typography>
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row?.key as string}>
              <StyledTableCell align="center" component="th" scope="row">
                {row?.key as string}
              </StyledTableCell>
              {days.map((day) => {
                const user = row[day.format('D')] as UserFieldsFragment;

                if (user) {
                  if (user._id !== userInfo?._id) {
                    return (
                      <StyledTableCell key={day.format('D')} align="center">
                        <UserAvatar user={user} />
                      </StyledTableCell>
                    );
                  }

                  return (
                    <StyledTableCell key={day.format('D')} align="center">
                      <Popover
                        render={() => (
                          <Box>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => {
                                cancelSelectSeat(
                                  row?._id as string,
                                  day.valueOf(),
                                );
                              }}
                            >
                              Cancel Selection
                            </Button>
                          </Box>
                        )}
                      >
                        <UserAvatar user={user} />
                      </Popover>
                    </StyledTableCell>
                  );
                }

                return (
                  <StyledTableCell key={day.format('D')} align="center">
                    <ButtonBase
                      onClick={() => {
                        selectSeat(row?._id as string, day.valueOf());
                      }}
                    >
                      <Box sx={{ width: 32, height: 32 }} />
                    </ButtonBase>
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
