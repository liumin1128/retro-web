import dayjs from 'dayjs';
import { getMonthDays } from '@/utils/common';
import {
  UserFieldsFragment,
  FindUserToSeatsDocument,
  FindSchedulesDocument,
  FindUserToSeatsQuery,
  FindSchedulesQuery,
  SeatFieldsFragment,
  ScheduleFieldsFragment,
  UserToSeatFieldsFragment,
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
  tags?: string[];
  users?: string[];
  skip?: boolean;
}

export interface Info {
  status?: string;
  seat?: SeatFieldsFragment;
  workingDay?: boolean;
  comment?: string;
}

export interface RowItem extends UserFieldsFragment {
  wfhDays: number;
  alDays: number;
  comment?: string;
  [key: string]: unknown;
}

const isDefined = <T,>(value: T | null | undefined): value is T => !!value;

// interface OutPut {
//   rows: RowItem[];
//   isAdmin: boolean;
// }

export default ({ startDate, endDate, tags, users, skip }: Props) => {
  const days = getMonthDays(dayjs(startDate).format('YYYY-MM'));

  const userInfoRes = useFindUserInfoQuery();

  const userRes = useFindUsersQuery({
    variables: {
      tags,
      requiredTags: ['ComTech'],
      users,
      sortKey: 'index',
      sortOrder: 1,
      limit: 1000,
    },
    skip,
    pollInterval: 1000 * 60, // 每分钟，自动同步一次数据
  });

  const variables = {
    startDate,
    endDate,
    tags,
    requiredTags: ['ComTech'],
    users,
  };

  const scheduleRes = useFindSchedulesQuery({
    variables,
    skip,
    pollInterval: 1000 * 60, // 每分钟，自动同步一次数据
  });

  const userToSeatRes = useFindUserToSeatsQuery({
    variables,
    skip,
    pollInterval: 1000 * 60, // 每分钟，自动同步一次数据
  });

  const [createSchedule] = useCreateScheduleMutation();
  const [toggleUserToSeat] = useToggleUserToSeatMutation();

  useUserToSeatCreatedSubscription({
    variables,
    skip,
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
          findUserToSeats: [
            ...findUserToSeats,
            data?.data?.userToSeatCreated,
          ].filter(isDefined),
        },
      });
    },
  });

  useUserToSeatDeletedSubscription({
    variables,
    skip,
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
            (i) => i?._id !== data?.data?.userToSeatDeleted?._id,
          ),
        },
      });
    },
  });

  useScheduleCreatedSubscription({
    variables,
    skip,
    onData: ({ client, data }) => {
      const cache = client.readQuery<FindSchedulesQuery>({
        query: FindSchedulesDocument,
        variables,
      });
      let findSchedules = cache?.findSchedules || [];
      findSchedules = findSchedules.filter(
        (i) => i?._id !== data?.data?.scheduleCreated?._id,
      );
      client.writeQuery({
        query: FindSchedulesDocument,
        variables,
        data: {
          findSchedules: [...findSchedules, data?.data?.scheduleCreated].filter(
            isDefined,
          ),
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
    (userRes.data?.findUsers?.filter(isDefined).map((i) => {
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

        const cur = scheduleRes.data?.findSchedules
          ?.filter(isDefined)
          .find(
            (j) =>
              j?.user?._id === i?._id &&
              dayjs(j?.date).format('D') === day.format('D'),
          ) as ScheduleFieldsFragment | undefined;
        if (cur) {
          temp.status = cur?.status || undefined;
          temp.comment = cur?.comment || undefined;
        }
        if (cur?.status === 'WFH') wfhDays += 1;
        if (cur?.status === 'AL') alDays += 1;
        if (cur?.status === 'AM') alDays += 0.5;
        if (cur?.status === 'PM') alDays += 0.5;
        if (cur?.status === 'MC') alDays += 1;

        const curSeat = userToSeatRes.data?.findUserToSeats
          ?.filter(isDefined)
          .find(
            (j) =>
              j?.user?._id === i?._id &&
              dayjs(j?.date).format('D') === day.format('D'),
          ) as UserToSeatFieldsFragment | undefined;
        if (curSeat?.seat) {
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
