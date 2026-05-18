import dayjs from 'dayjs';
import {
  ScheduleFieldsFragment,
  UserFieldsFragment,
  UserToSeatFieldsFragment,
} from '@/generated/graphql';
import { isDefined } from '@/pages/seatselection/utils/common';
import { Info, RowItem } from './types';

function getScheduleForDay(
  schedules: ScheduleFieldsFragment[],
  userId: string,
  day: dayjs.Dayjs,
): ScheduleFieldsFragment | undefined {
  return schedules.find((schedule) => {
    return (
      schedule.user?._id === userId &&
      dayjs(schedule.date).format('D') === day.format('D')
    );
  });
}

function getSeatForDay(
  userToSeats: UserToSeatFieldsFragment[],
  userId: string,
  day: dayjs.Dayjs,
): UserToSeatFieldsFragment | undefined {
  return userToSeats.find((userToSeat) => {
    return (
      userToSeat.user?._id === userId &&
      dayjs(userToSeat.date).format('D') === day.format('D')
    );
  });
}

function getLeaveDays(status?: string | null): number {
  if (status === 'AL' || status === 'MC') {
    return 1;
  }

  if (status === 'AM' || status === 'PM') {
    return 0.5;
  }

  return 0;
}

export function getDayInfo(row: RowItem, key: string): Info {
  return (row[key] || {}) as Info;
}

export function buildScheduleRows({
  users,
  schedules,
  userToSeats,
  days,
  currentUserId,
}: {
  users: UserFieldsFragment[];
  schedules: ScheduleFieldsFragment[];
  userToSeats: UserToSeatFieldsFragment[];
  days: dayjs.Dayjs[];
  currentUserId?: string;
}): RowItem[] {
  return users.map((user) => {
    const row: RowItem = {
      ...user,
      isMe: user._id === currentUserId,
      wfhDays: 0,
      alDays: 0,
    };

    days.forEach((day) => {
      const dayInfo: Info = {
        workingDay: day.day() !== 0 && day.day() !== 6,
      };
      const schedule = getScheduleForDay(schedules, user._id, day);
      const userToSeat = getSeatForDay(userToSeats, user._id, day);

      if (schedule) {
        dayInfo.status = schedule.status || undefined;
        dayInfo.comment = schedule.comment || undefined;
      }

      if (schedule?.status === 'WFH') {
        row.wfhDays += 1;
      }

      row.alDays += getLeaveDays(schedule?.status);

      if (userToSeat?.seat) {
        dayInfo.seat = userToSeat.seat;
      }

      row[day.format('D')] = dayInfo;
    });

    return row;
  });
}

export function filterScheduleData<T>(values?: Array<T | null> | null): T[] {
  return values?.filter(isDefined) || [];
}
