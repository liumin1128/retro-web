import React, { Fragment, useRef } from "react";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  useCreateUserToSeatMutation,
  useDeleteUserToSeatMutation,
  useFindUserToSeatsQuery,
} from '@/generated/graphql';
import { useSnackbar } from 'notistack';
import { useUserInfo } from '@/hooks/useUserInfo';
import ModalRef, { ModalRefInstance } from '@/components/ModalRef/Dialog';
import SeatCom from './Seat';
import list from './seatData';
import Box from "@mui/material/Box";

const users = [
  {
    _id: 1,
    seatID: 7,
    avatarUrl: 'https://imgs.react.mobi/FidGoJe2MQp0ulEA6Pnsi1_g3TdE',
  },
  {
    _id: 2,
    seatID: 1,
    avatarUrl: 'https://imgs.react.mobi/FtGI5pr-EDVQPLHjzzqCbq1Az_XY',
  },
  {
    _id: 3,
    seatID: 10,
    avatarUrl: 'https://imgs.react.mobi/FgyFkFuZsl2lFdoOypa8fPuNXura',
  },

  {
    _id: 4,
    seatID: 6,
    avatarUrl: 'https://imgs.react.mobi/FlyfG7wjOu9qzDbwaIdkjhadtt8j',
  },
];

export default function SeatList() {
  const modalRef = useRef<ModalRefInstance<unknown>>();

  const { enqueueSnackbar } = useSnackbar();

  const { loading: userInfoLoading, data: userInfoData } = useUserInfo();

  const [createUserToSeat] = useCreateUserToSeatMutation();
  const [deleteUserToSeat] = useDeleteUserToSeatMutation();

  const { loading, data } = useFindUserToSeatsQuery({
    variables: { date: '2023-03-22' },
  });

  const userInfo = userInfoData?.findUserInfo;
  console.log('userInfo');
  console.log(userInfo);

  const handleClick = async (_id: string) => {
    console.log('_id');
    console.log(_id);
    try {
      const res = await createUserToSeat({
        variables: { seat: _id, date: '2023-03-22' },
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
    modalRef.current?.open()
    console.log('_id');
    console.log(_id);
    // try {
    //   const res = await deleteUserToSeat({
    //     variables: { seat: _id, date: '2023-03-22' },
    //   });
    //   console.log('res');
    //   console.log(res);
    // } catch (err) {
    //   console.log('err');
    //   console.log(err);
    //   enqueueSnackbar(err.message, {
    //     variant: 'error',
    //     autoHideDuration: 3000,
    //   });
    // }
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

      <ModalRef
        title="Create"
        ref={modalRef}
        fullWidth
        render={() => {
          return <Box>11111</Box>;
        }}

        onOk={() => {
          console.log("xxxxx")
        }}
      />
    </div>
  );
}
