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
} from '../services/userToSeatService';
import { getErrorMessage } from '../utils/common';

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
      await createSeatSelection(createUserToSeat, _id, date);
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  const handleCancel = async (_id: string, date: number) => {
    try {
      await deleteSeatSelection(deleteUserToSeat, _id, date);
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), {
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
