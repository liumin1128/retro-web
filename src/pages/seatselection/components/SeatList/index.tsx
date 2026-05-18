import React, { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import {
  useCreateUserToSeatMutation,
  useDeleteUserToSeatMutation,
  useFindUserToSeatsQuery,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
} from '@/generated/graphql';
import { useSnackbar } from 'notistack';
import { useUserInfo } from '@/hooks/useUserInfo';
import {
  createUserToSeat as createSeatSelection,
  deleteUserToSeat as deleteSeatSelection,
} from '../../services/userToSeatService';
import { getErrorMessage } from '../../utils/common';
import SeatCom from './Seat';
import list from './seatData';

interface Props {
  date: number;
}

export default function SeatList({ date }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { data: userInfoData } = useUserInfo();

  const { data, refetch } = useFindUserToSeatsQuery({
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

  const handleClick = async (_id: string) => {
    try {
      await createSeatSelection(createUserToSeat, _id, date);
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const handleCancel = async (_id: string) => {
    try {
      await deleteSeatSelection(deleteUserToSeat, _id, date);
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <div>
      <Stack spacing={1}>
        {list.map((line) => {
          return (
            <Fragment key={line.key}>
              <div>
                {line.list.map((seats) => {
                  return (
                    <div key={seats.key} style={{ display: 'flex' }}>
                      {seats.seats.map((seat) => {
                        const user = data?.findUserToSeats?.find(
                          (userToSeat) => userToSeat?.seat?._id === seat._id,
                        )?.user;
                        const selectedUser = user || undefined;

                        return (
                          <div key={seat.id}>
                            <SeatCom
                              seat={seat}
                              user={selectedUser}
                              onClick={handleClick}
                              onCancel={handleCancel}
                              selected={
                                !!selectedUser?._id &&
                                !!userInfo?._id &&
                                selectedUser._id === userInfo?._id
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
