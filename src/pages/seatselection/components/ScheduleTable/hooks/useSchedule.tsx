import dayjs from 'dayjs';
import { getMonthDays } from '@/utils/common';
import {
  FindUserToSeatsDocument,
  FindSchedulesDocument,
  FindUserToSeatsQuery,
  FindSchedulesQuery,
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
import {
  ToggleScheduleArgs,
  ToggleSeatArgs,
  toggleSchedule as saveSchedule,
  toggleSeat as saveSeat,
} from '@/pages/seatselection/services/scheduleService';
import { isDefined } from '@/pages/seatselection/utils/common';
import { buildScheduleRows, filterScheduleData } from '../utils';
import { Info, RowItem } from '../types';
// import useSubscriptionUserToSeat from './useSubscriptionUserToSeat';

interface Props {
  startDate: number;
  endDate: number;
  tags?: string[];
  users?: string[];
  skip?: boolean;
}

// interface OutPut {
//   rows: RowItem[];
//   isAdmin: boolean;
// }

interface UseScheduleResult {
  isAdmin?: boolean;
  rows: RowItem[];
  days: dayjs.Dayjs[];
  toggleSchedule: (args: ToggleScheduleArgs) => Promise<void>;
  toggleSeat: (args: ToggleSeatArgs) => Promise<void>;
}

export default function useSchedule({
  startDate,
  endDate,
  tags,
  users,
  skip,
}: Props): UseScheduleResult {
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

  const rows = buildScheduleRows({
    users: filterScheduleData(userRes.data?.findUsers),
    schedules: filterScheduleData(scheduleRes.data?.findSchedules),
    userToSeats: filterScheduleData(userToSeatRes.data?.findUserToSeats),
    days,
    currentUserId: userInfoRes.data?.findUserInfo?._id,
  });

  return {
    isAdmin,
    rows,
    days,
    toggleSchedule: (args) => saveSchedule(createSchedule, args),
    toggleSeat: (args) => saveSeat(toggleUserToSeat, args),
  };
}

export type { Info, RowItem };
