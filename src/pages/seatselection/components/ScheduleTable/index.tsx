import React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import {
  UserFieldsFragment,
  useFindUserInfoQuery,
  SeatFieldsFragment,
} from '@/generated/graphql';
import { statusColorMap, workDayColorMap } from './statusList';
import SeatList from './components/SeatList';
import StatusList from './components/StatusList';
import useSchedule from './hooks/useSchedule';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 64,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontweight: 'bold',
    borderRight: '1px #f5f5f5 solid',
  },
  minWidth: 64,
  padding: '4px 8px',
  cursor: 'pointer',
}));

const StyledTableRow = styled(TableRow)(() => ({}));

interface Props {
  startDate: number;
  endDate: number;
}

interface Info {
  status?: string;
  seat?: SeatFieldsFragment;
}

interface RowItem extends UserFieldsFragment {
  [key: string]: unknown;
}

export default function CustomizedTables({ startDate, endDate }: Props) {
  const userInfoRes = useFindUserInfoQuery();
  const isAdmin =
    userInfoRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');

  const { rows, days, toggleSchedule, toggleSeat } = useSchedule({
    startDate,
    endDate,
  });

  const modalRef = React.useRef<ModalMethods>(null);

  // if (userRes.loading) return <p>loading</p>;
  // if (userRes.error) return <p>error</p>;

  const handleClickCell = (day: dayjs.Dayjs, row: RowItem) => {
    const obj = row[day.format('D')] as Info;
    modalRef.current?.open({
      title: `${row.nickname} ${day.format('YYYY-MM-DD')}`,
      render: () => {
        return (
          <Stack spacing={2}>
            <Typography variant="caption">Status</Typography>
            <StatusList
              value={obj?.status}
              onChange={async (status) => {
                await toggleSchedule({
                  date: day.valueOf(),
                  user: row._id,
                  status,
                });
                modalRef.current?.close();
              }}
            />
            <Typography variant="caption">SeatNo</Typography>
            <SeatList
              currentUser={row}
              date={day.valueOf()}
              isAdmin={isAdmin}
              onChange={async (seat) => {
                await toggleSeat({ date: day.valueOf(), user: row._id, seat });
                modalRef.current?.close();
              }}
            />
          </Stack>
        );
      },
    });
  };

  console.log('rows', rows);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
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
              <StyledTableCell align="center">Office</StyledTableCell>
              <StyledTableCell align="center">WFH</StyledTableCell>
              <StyledTableCell align="center">AL</StyledTableCell>
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
            {rows.map((row) => {
              const isMe = row?._id === userInfoRes.data?.findUserInfo?._id;

              let wfhDays = 0;
              let alDays = 0;
              Object.keys(row).forEach((key) => {
                const obj = row[key] as Info;
                if (obj?.status === 'WFH') wfhDays += 1;
                if (obj?.status === 'AL') alDays += 1;
                if (obj?.status === 'AM') alDays += 0.5;
                if (obj?.status === 'PM') alDays += 0.5;
                if (obj?.status === 'MC') alDays += 1;
              });
              const officeDays = days.length - wfhDays - alDays;

              return (
                <StyledTableRow key={row?._id as string}>
                  <StyledTableCell align="left" component="th" scope="row">
                    <Stack direction="row" spacing={1}>
                      <Avatar
                        sx={{ width: 20, height: 20 }}
                        src={row?.avatarUrl as string}
                      />
                      <Typography>{row?.nickname}</Typography>
                    </Stack>
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    {officeDays}
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    {wfhDays}
                  </StyledTableCell>

                  <StyledTableCell align="center" component="th" scope="row">
                    {alDays}
                  </StyledTableCell>

                  {days.map((day) => {
                    const info = row[day.format('D')] as Info;

                    let text = info.seat?.id || info.status;
                    if (text === 'Office') text = '';

                    let style = {
                      backgroundColor: workDayColorMap[day.day()],
                      color: '#333',
                    };

                    if (info?.status && info?.status !== 'Office') {
                      style = {
                        backgroundColor: statusColorMap[info.status as string],
                        color: 'white',
                      };
                    }

                    if (info?.seat?.id) {
                      style = {
                        backgroundColor: 'green',
                        color: 'white',
                      };
                    }

                    return (
                      <StyledTableCell
                        key={day.format('D')}
                        align="center"
                        onClick={
                          isAdmin || isMe
                            ? () => {
                                handleClickCell(day, row);
                              }
                            : undefined
                        }
                        sx={style}
                      >
                        {text}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal ref={modalRef} showCancel={false} showConfirm={false} />
    </>
  );
}
