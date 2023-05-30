import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import { getMonthDays } from '@/utils/common';
import Popover from '@/components/Popover';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import {
  UserFieldsFragment,
  SeatFieldsFragment,
  useFindUsersQuery,
  useFindSchedulesQuery,
  useCreateScheduleMutation,
  useFindUserInfoQuery,
  useFindUserToSeatsQuery,
  useAdminCreateScheduleMutation,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
  useScheduleCreatedSubscription,
} from '@/generated/graphql';
import { blue } from '@mui/material/colors';
import statusList, { statusColorMap, workDayColorMap } from './statusList';
import SeatList from './components/SeatList';
import StatusList from './components/StatusList';
// import useSeats from '../../../hooks/useSeats';
// import { SEAT_LIST } from './data';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  // backgroundColor: theme.palette.action.hover,
  // },
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

interface Info {
  status?: string;
  seat?: SeatFieldsFragment;
}

interface RowItem extends UserFieldsFragment {
  [key: string]: any;
}

export default function CustomizedTables({ startDate, endDate }: Props) {
  const days = getMonthDays(dayjs(startDate).format('YYYY-MM'));

  const userInfoRes = useFindUserInfoQuery();

  const userRes = useFindUsersQuery({
    variables: {
      tags: ['ComTech'],
    },
  });

  const scheduleRes = useFindSchedulesQuery({
    variables: {
      startDate: 1682870400000,
      endDate: 1685491200000,
    },
  });

  const userToSeatRes = useFindUserToSeatsQuery({
    variables: { startDate: 1682870400000, endDate: 1685491200000 },
  });

  const [createSchedule] = useCreateScheduleMutation();

  useUserToSeatDeletedSubscription({
    onSubscriptionData: () => {
      userToSeatRes.refetch();
    },
  });

  useUserToSeatCreatedSubscription({
    onSubscriptionData: () => {
      userToSeatRes.refetch();
    },
  });

  useScheduleCreatedSubscription({
    onSubscriptionData: () => {
      scheduleRes.refetch();
    },
  });

  const modalRef = React.useRef<ModalMethods>(null);

  // if (userRes.loading) return <p>loading</p>;
  // if (userRes.error) return <p>error</p>;

  const isAdmin =
    userInfoRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');

  const handleCreateSchedule = async (
    status: string,
    date: number,
    user?: string,
  ) => {
    await createSchedule({ variables: { status, date, user } });
  };

  // const renderStatusList = (day: Dayjs, onClick: (arg: string) => void) => {
  //   return (
  //     <List sx={{ pt: 0, width: 360 }}>
  //       {statusList.map((item) => (
  //         <ListItem disableGutters key={item.value}>
  //           <ListItemButton
  //             onClick={() => {
  //               onClick(item.value);
  //             }}
  //           >
  //             <ListItemAvatar>
  //               <Avatar
  //                 sx={{
  //                   bgcolor: item.bgcolor,
  //                   color: item.color,
  //                 }}
  //               >
  //                 {item.icon}
  //               </Avatar>
  //             </ListItemAvatar>
  //             <ListItemText primary={item.value} secondary={item.label} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   );
  // };

  const handleClickCell = (day: dayjs.Dayjs, row: RowItem) => {
    modalRef.current?.open({
      title: `${row.nickname} ${day.format('YYYY-MM-DD')}`,
      render: () => {
        return (
          <Stack spacing={2}>
            <Typography variant="caption">Status</Typography>
            <StatusList
              value={row[day.format('D')]?.status}
              onChange={(status) => {
                handleCreateSchedule(status, day.valueOf(), row._id);
              }}
            />
            <Typography variant="caption">SeatNo</Typography>
            <SeatList currentUser={row} date={day.valueOf()} />
          </Stack>
        );
      },
      // render: () =>
      //   renderStatusList(day, (status) => {
      //     const user = isAdmin ? row._id : undefined;
      //     handleCreateSchedule(status, day.valueOf(), user);
      //   }),
    });
  };

  const rows =
    (userRes.data?.findUsers?.map((i) => {
      const obj: RowItem = i;
      // eslint-disable-next-line array-callback-return
      days.map((day) => {
        const sss = {};
        const cur = scheduleRes.data?.findSchedules?.find(
          (j) =>
            j?.user?._id === i._id &&
            dayjs(j.date).format('D') === day.format('D'),
        );
        if (cur) {
          sss.status = cur.status;
          // obj[day.format('D')] = cur.status;
        }

        const curSeat = userToSeatRes.data?.list?.find(
          (j) =>
            j?.user?._id === i._id &&
            dayjs(j.date).format('D') === day.format('D'),
        );
        if (curSeat) {
          // obj[day.format('D')] = curSeat.seat?._id;
          sss.seat = curSeat.seat;
        }
        obj[day.format('D')] = sss;
      });
      return obj;
    }) as RowItem[]) || [];

  console.log('rows', rows);

  console.log('userToSeatRes', userToSeatRes.data?.list);

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
              Object.keys(row).map((key) => {
                if (row[key]?.status === 'WFH') wfhDays += 1;
                if (row[key]?.status === 'AL') alDays += 1;
                if (row[key]?.status === 'AM') alDays += 0.5;
                if (row[key]?.status === 'PM') alDays += 0.5;
                if (row[key]?.status === 'MC') alDays += 1;
              });

              const officeDays = days.length - wfhDays - alDays;

              return (
                <StyledTableRow
                  key={row?._id as string}
                  // sx={{
                  //   backgroundColor: (theme) =>
                  //     isMe ? theme.palette.action.hover : '',
                  // }}
                >
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
                    if (text === 'None') text = '';

                    let style = {
                      backgroundColor: workDayColorMap[day.day()],
                      color: '#333',
                    };

                    if (info?.status && info?.status !== 'None') {
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
