import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getMonthDays } from '@/utils/common';
import {
  FindSeatsQuery,
  ToggleUserToSeatMutationFn,
  UserFieldsFragment,
  useCreateScheduleMutation,
  useFindSeatsQuery,
  useFindUserInfoQuery,
  useToggleUserToSeatMutation,
} from '@/generated/graphql';
import {
  toggleSchedule as saveSchedule,
  toggleSeat as saveSeat,
} from '@/pages/seatselection/services/scheduleService';
import { getErrorMessage } from '@/pages/seatselection/utils/common';
import { getSeatIdByDisplayIndex } from '@/pages/seatselection/utils/seatLayout';
import {
  canSelectSeatByTags,
  isMonthlyBatchSeatSelectionOpen,
} from '@/pages/seatselection/utils/seatRules';
import { loadWeeklyValues, storeWeeklyValues } from '../utils';
import { Log, WeeklyValues } from '../types';

const SUBMIT_DELAY = 300;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getLogKey(day: Dayjs): string {
  return day.format('YYYY-MM-DD ddd');
}

function findSeat(
  seatsData: FindSeatsQuery | undefined,
  seatId: string,
): NonNullable<NonNullable<FindSeatsQuery['findSeats']>[number]> | undefined {
  return (
    seatsData?.findSeats?.find((seat) => seat?._id === seatId) || undefined
  );
}

interface ProcessDayArgs {
  day: Dayjs;
  seatValue: number;
  startDate: number;
  isAdmin?: boolean;
  currentUser?: UserFieldsFragment | null;
  seatsData?: FindSeatsQuery;
  toggleUserToSeat: ToggleUserToSeatMutationFn;
  createSchedule: ReturnType<typeof useCreateScheduleMutation>[0];
}

async function processDay({
  day,
  seatValue,
  startDate,
  isAdmin,
  currentUser,
  seatsData,
  toggleUserToSeat,
  createSchedule,
}: ProcessDayArgs): Promise<Log> {
  if (day.isBefore(dayjs().startOf('day'))) {
    return {
      status: 'info',
      text: 'date invalid',
    };
  }

  if (seatValue === -1) {
    return {
      status: 'info',
      text: 'skip',
    };
  }

  if (!currentUser?._id) {
    return {
      status: 'error',
      text: 'user not found',
    };
  }

  if (seatValue === 0) {
    await saveSchedule(createSchedule, {
      status: 'WFH',
      date: day.valueOf(),
      user: currentUser._id,
    });

    return {
      status: 'success',
      text: 'set WFH success',
    };
  }

  const seatId = getSeatIdByDisplayIndex(seatValue);

  if (!seatId) {
    return {
      status: 'error',
      text: 'seat not found',
    };
  }

  if (!isAdmin) {
    const currentSeat = findSeat(seatsData, seatId);

    if (!currentSeat) {
      return {
        status: 'error',
        text: 'seat not found',
      };
    }

    const tagsMatched = canSelectSeatByTags(currentUser, currentSeat);
    const timeOk = isMonthlyBatchSeatSelectionOpen(startDate, tagsMatched);

    if (!timeOk) {
      return {
        status: 'error',
        text: 'out of time range',
      };
    }
  }

  await saveSeat(toggleUserToSeat, {
    seat: seatId,
    date: day.valueOf(),
    user: currentUser._id,
  });

  return {
    status: 'success',
    text: `set Seat No: ${seatValue} success`,
  };
}

interface UseWeeklyScheduleResult {
  logs: Record<string, Log>;
  setting: boolean;
  values: WeeklyValues;
  setValue: (index: number, value: number) => void;
  submit: () => Promise<void>;
}

export default function useWeeklySchedule(
  startDate: number,
): UseWeeklyScheduleResult {
  const [setting, setSetting] = useState(false);
  const [logs, setLogs] = useState<Record<string, Log>>({});
  const [values, setValues] = useState<WeeklyValues>(loadWeeklyValues);
  const userRes = useFindUserInfoQuery();
  const seatsRes = useFindSeatsQuery();
  const [createSchedule] = useCreateScheduleMutation();
  const [toggleUserToSeat] = useToggleUserToSeatMutation();
  const currentUser = userRes.data?.findUserInfo;
  const isAdmin = currentUser?.tags?.includes('SeatSelectionAdmin');

  useEffect(() => {
    storeWeeklyValues(values);
  }, [values]);

  const setValue = (index: number, value: number): void => {
    setValues((previousValues) => {
      const nextValues = [...previousValues];
      nextValues[index] = value;
      return nextValues;
    });
  };

  const submit = async (): Promise<void> => {
    const days = getMonthDays(dayjs(startDate).format('YYYY-MM'));

    setSetting(true);

    for (let i = 0; i < days.length; i += 1) {
      const day = days[i];
      const weekdayIndex = day.weekday() % 7;
      const seatValue = values[weekdayIndex];

      try {
        // eslint-disable-next-line no-await-in-loop
        const log = await processDay({
          day,
          seatValue,
          startDate,
          isAdmin,
          currentUser,
          seatsData: seatsRes.data,
          toggleUserToSeat,
          createSchedule,
        });

        setLogs((previousLogs) => {
          return {
            ...previousLogs,
            [getLogKey(day)]: log,
          };
        });
      } catch (error) {
        setLogs((previousLogs) => {
          return {
            ...previousLogs,
            [getLogKey(day)]: {
              status: 'error',
              text: getErrorMessage(error),
            },
          };
        });
      }

      // eslint-disable-next-line no-await-in-loop
      await sleep(SUBMIT_DELAY);
    }

    setSetting(false);
  };

  return {
    logs,
    setting,
    values,
    setValue,
    submit,
  };
}
