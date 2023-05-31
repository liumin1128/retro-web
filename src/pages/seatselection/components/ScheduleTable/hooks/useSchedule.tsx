import dayjs from 'dayjs';
import { getMonthDays } from '@/utils/common';
import {
  UserFieldsFragment,
  useFindUsersQuery,
  useFindSchedulesQuery,
  useFindUserInfoQuery,
  useFindUserToSeatsQuery,
  useUserToSeatDeletedSubscription,
  useUserToSeatCreatedSubscription,
  useScheduleCreatedSubscription,
  useCreateScheduleMutation,
  useToggleUserToSeatMutation,
} from '@/generated/graphql';

interface Props {
  startDate: number;
  endDate: number;
}

interface Info {
  status?: string | null;
  seat?: unknown;
}

interface RowItem extends UserFieldsFragment {
  [key: string]: unknown;
}

// interface OutPut {
//   rows: RowItem[];
//   isAdmin: boolean;
// }

export default ({ startDate, endDate }: Props) => {
  const days = getMonthDays(dayjs(startDate).format('YYYY-MM'));

  const userInfoRes = useFindUserInfoQuery();

  const userRes = useFindUsersQuery({
    variables: { tags: ['ComTech'] },
  });

  const scheduleRes = useFindSchedulesQuery({
    variables: { startDate, endDate },
  });

  const userToSeatRes = useFindUserToSeatsQuery({
    variables: { startDate, endDate },
  });

  const [createSchedule] = useCreateScheduleMutation();
  const [toggleUserToSeat] = useToggleUserToSeatMutation();

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

  const isAdmin =
    userInfoRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');

  const toggleSchedule = async ({
    status,
    date,
    user,
  }: {
    status: string;
    date: number;
    user?: string;
  }) => {
    await createSchedule({ variables: { status, date, user } });
  };

  const toggleSeat = async ({
    seat,
    date,
    user,
  }: {
    seat: string;
    date: number;
    user: string;
  }) => {
    await toggleUserToSeat({ variables: { user, seat, date } });
  };

  const rows =
    (userRes.data?.findUsers?.map((i) => {
      // eslint-disable-next-line
      // @ts-ignore
      const obj: RowItem = { ...i };
      // eslint-disable-next-line array-callback-return
      days.map((day) => {
        const temp: Info = {};
        const cur = scheduleRes.data?.findSchedules?.find(
          (j) =>
            j?.user?._id === i?._id &&
            dayjs(j?.date).format('D') === day.format('D'),
        );
        if (cur) {
          temp.status = cur?.status;
          // obj[day.format('D')] = cur.status;
        }

        const curSeat = userToSeatRes.data?.list?.find(
          (j) =>
            j?.user?._id === i?._id &&
            dayjs(j?.date).format('D') === day.format('D'),
        );
        if (curSeat) {
          temp.seat = curSeat.seat;
        }
        obj[day.format('D')] = temp;
      });
      return obj;
    }) as RowItem[]) || [];

  return {
    isAdmin,
    rows,
    days,
    toggleSchedule,
    toggleSeat,
  };
};
