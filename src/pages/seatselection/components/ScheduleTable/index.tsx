import React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
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
import SeatList from './components/SeatList';
import StatusList from './components/StatusList';
import StyledTableCell from './components/StyledTableCell';
import useSchedule from './hooks/useSchedule';

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
                <TableRow key={row?._id as string}>
                  <StyledTableCell align="left" component="th" scope="row">
                    <Stack direction="row" spacing={1}>
                      <Avatar
                        sx={{ width: 20, height: 20 }}
                        src={row?.avatarUrl as string}
                      />
                      <Typography sx={{ whiteSpace: 'nowrap' }}>
                        {row?.nickname}
                      </Typography>
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

                    let onClick;
                    if (isAdmin || isMe) {
                      onClick = () => {
                        handleClickCell(day, row);
                      };
                    }

                    return (
                      <StyledTableCell
                        key={day.format('D')}
                        align="center"
                        onClick={onClick}
                        status={info?.status}
                        workingDay={day.day() !== 0 && day.day() !== 6}
                        hasSeat={!!info?.seat?.id}
                      >
                        {text}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal ref={modalRef} showCancel={false} showConfirm={false} />
    </>
  );
}
