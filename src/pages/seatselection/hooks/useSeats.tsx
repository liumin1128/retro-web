import {
  useCreateUserToSeatMutation,
  useDeleteUserToSeatMutation,
  useFindUserToSeatsQuery,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
} from '@/generated/graphql';
import { useSnackbar } from 'notistack';
import { useUserInfo } from '@/hooks/useUserInfo';

interface Props {
  startDate: number;
  endDate: number;
}

export default function useSeats({ startDate, endDate }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { loading: userInfoLoading, data: userInfoData } = useUserInfo();

  const { loading, data, refetch } = useFindUserToSeatsQuery({
    variables: { startDate, endDate },
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

  const handleClick = async (_id: string, date: number) => {
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

  const handleCancel = async (_id: string, date: number) => {
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

  return {
    loading: loading || userInfoLoading,
    userInfo,
    data,
    selectSeat: handleClick,
    cancelSelectSeat: handleCancel,
  };
}
