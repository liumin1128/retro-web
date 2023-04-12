import React, { Fragment, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  useCreateUserToSeatMutation,
  useDeleteUserToSeatMutation,
  useFindUserToSeatsQuery,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
} from '@/generated/graphql';
import { useSnackbar } from 'notistack';
import { useUserInfo } from '@/hooks/useUserInfo';
import Box from '@mui/material/Box';
import { Dayjs } from 'dayjs';
import SeatCom from './Seat';
import list from './seatData';

interface Props {
  date: number;
}

export default function SeatList({ date }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { loading: userInfoLoading, data: userInfoData } = useUserInfo();

  const { loading, data, refetch } = useFindUserToSeatsQuery({
    variables: { startDate: date },
  });

  const [createUserToSeat] = useCreateUserToSeatMutation();
  const [deleteUserToSeat] = useDeleteUserToSeatMutation();

  useUserToSeatDeletedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
  });

  useUserToSeatCreatedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
  });

  const userInfo = userInfoData?.findUserInfo;
  console.log('userInfo');
  console.log(userInfo);

  const handleClick = async (_id: string) => {
    console.log('_id');
    console.log(_id);
    try {
      const res = await createUserToSeat({
        variables: { seat: _id, date },
      });
      console.log('res');
      console.log(res);
    } catch (err) {
      console.log('err');
      console.log(err);
      enqueueSnackbar(err.message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const handleCancel = async (_id: string) => {
    // modalRef.current?.open();
    // console.log('_id');
    // console.log(_id);
    try {
      const res = await deleteUserToSeat({
        variables: { seat: _id, date },
      });
      console.log('res');
      console.log(res);
    } catch (err) {
      console.log('err');
      console.log(err);
      enqueueSnackbar(err.message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  console.log('data');
  console.log(data);

  return (
    <div>
      <Stack spacing={1}>
        {list.map((line) => {
          return (
            <Fragment key={line.key}>
              <Typography variant="caption">{line.key}</Typography>
              <div>
                {line.list.map((seats) => {
                  return (
                    <div key={seats.key} style={{ display: 'flex' }}>
                      {seats.seats.map((seat) => {
                        const user = data?.list.find(
                          (k) => k.seat._id === seat._id,
                        )?.user;
                        return (
                          <div key={seat.id}>
                            <SeatCom
                              seat={seat}
                              user={user}
                              onClick={handleClick}
                              onCancel={handleCancel}
                              selected={
                                !!user?._id &&
                                !!userInfo?._id &&
                                user._id === userInfo?._id
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <br />
            </Fragment>
          );
        })}
      </Stack>
    </div>
  );
}
