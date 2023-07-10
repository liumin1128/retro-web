import dayjs from 'dayjs';
import { getMonthDays } from '@/utils/common';
import {
  UserFieldsFragment,
  FindUserToSeatsDocument,
  FindSchedulesDocument,
  FindUserToSeatsQuery,
  FindSchedulesQuery,
  SeatFieldsFragment,
  useFindUsersQuery,
  useFindSchedulesQuery,
  useFindUserInfoQuery,
  useFindUserToSeatsQuery,
  useScheduleCreatedSubscription,
  useCreateScheduleMutation,
  useToggleUserToSeatMutation,
  useUserToSeatCreatedSubscription,
  useUserToSeatDeletedSubscription,
} from '@/generated/graphql';
// import useSubscriptionUserToSeat from './useSubscriptionUserToSeat';

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
  wfhDays: number;
  alDays: number;
  comment?: string;
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
    variables: { tags: ['ComTech'], sortKey: 'index', sortOrder: 1 },
    pollInterval: 1000 * 60, // 每分钟，自动同步一次数据
  });

  const variables = { startDate, endDate };

  const scheduleRes = useFindSchedulesQuery({
    variables,
    pollInterval: 1000 * 60, // 每分钟，自动同步一次数据
  });

  const userToSeatRes = useFindUserToSeatsQuery({
    variables,
    pollInterval: 1000 * 60, // 每分钟，自动同步一次数据
  });

  const [createSchedule] = useCreateScheduleMutation();
  const [toggleUserToSeat] = useToggleUserToSeatMutation();

  useUserToSeatCreatedSubscription({
    variables,
    onData: ({ client, data }) => {
      const cache = client.readQuery<FindUserToSeatsQuery>({
        query: FindUserToSeatsDocument,
        variables,
      });
      const findUserToSeats = cache?.findUserToSeats || [];
      client.writeQuery({
        query: FindUserToSeatsDocument,
        variables,
        data: {
          findUserToSeats: [...findUserToSeats, data?.data?.userToSeatCreated],
        },
      });
    },
  });

  useUserToSeatDeletedSubscription({
    variables,
    onData: ({ client, data }) => {
      const cache = client.readQuery<FindUserToSeatsQuery>({
        query: FindUserToSeatsDocument,
        variables,
      });
      const findUserToSeats = cache?.findUserToSeats || [];
      client.writeQuery({
        query: FindUserToSeatsDocument,
        variables,
        data: {
          findUserToSeats: findUserToSeats.filter(
            (i) => i._id !== data?.data?.userToSeatDeleted?._id,
          ),
        },
      });
    },
  });

  useScheduleCreatedSubscription({
    onData: ({ client, data }) => {
      const cache = client.readQuery<FindSchedulesQuery>({
        query: FindSchedulesDocument,
        variables,
      });
      let findSchedules = cache?.findSchedules || [];
      findSchedules = findSchedules.filter(
        (i) => i._id !== data?.data?.scheduleCreated?._id,
      );
      client.writeQuery({
        query: FindSchedulesDocument,
        variables,
        data: {
          findSchedules: [...findSchedules, data?.data?.scheduleCreated],
        },
      });
    },
  });

  const isAdmin =
    userInfoRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');

  const toggleSchedule = async (args: {
    status: string;
    date: number;
    user?: string;
    comment?: string;
  }) => {
    await createSchedule({ variables: args });
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
          temp.comment = cur?.comment;
        }
        if (cur?.status === 'WFH') wfhDays += 1;
        if (cur?.status === 'AL') alDays += 1;
        if (cur?.status === 'AM') alDays += 0.5;
        if (cur?.status === 'PM') alDays += 0.5;
        if (cur?.status === 'MC') alDays += 1;

        const curSeat = userToSeatRes.data?.findUserToSeats?.find(
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
