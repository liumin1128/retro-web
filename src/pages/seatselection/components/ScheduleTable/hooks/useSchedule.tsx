import dayjs from 'dayjs';
import { getMonthDays } from '@/utils/common';
import {
  UserFieldsFragment,
  SeatFieldsFragment,
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

export interface Info {
  status?: string;
  seat?: SeatFieldsFragment;
  workingDay?: boolean;
}

export interface RowItem extends UserFieldsFragment {
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
      const obj: RowItem = {
        ...i,
        isMe: i._id === userInfoRes.data?.findUserInfo?._id,
      };

      let wfhDays = 0;
      let alDays = 0;

      // eslint-disable-next-line array-callback-return
      days.map((day) => {
        const temp: Info = {
          workingDay: day.day() !== 0 && day.day() !== 6,
        };

        const cur = scheduleRes.data?.findSchedules?.find(
          (j) =>
            j?.user?._id === i?._id &&
            dayjs(j?.date).format('D') === day.format('D'),
        );
        if (cur) {
          temp.status = cur?.status;
        }
        if (cur?.status === 'WFH') wfhDays += 1;
        if (cur?.status === 'AL') alDays += 1;
        if (cur?.status === 'AM') alDays += 0.5;
        if (cur?.status === 'PM') alDays += 0.5;
        if (cur?.status === 'MC') alDays += 1;

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

      obj.wfhDays = wfhDays;
      obj.alDays = alDays;

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
