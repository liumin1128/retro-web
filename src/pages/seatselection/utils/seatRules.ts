import dayjs, { Dayjs } from 'dayjs';
import { SeatFieldsFragment, UserFieldsFragment } from '@/generated/graphql';
import { containsAllValues, isDefined } from './common';

export function canSelectSeatByTags(
  user?: Pick<UserFieldsFragment, 'tags'> | null,
  seat?: Pick<SeatFieldsFragment, 'tags'> | null,
): boolean {
  return containsAllValues(
    user?.tags?.filter(isDefined),
    seat?.tags?.filter(isDefined),
  );
}

export function isSeatSelectionOpen(
  targetDate: Dayjs,
  today = dayjs(),
): boolean {
  if (
    today.add(1, 'month').format('YYYY-MM') !== targetDate.format('YYYY-MM')
  ) {
    return false;
  }

  return !today.isBefore(
    today.startOf('months').add(10, 'days').subtract(12, 'hours'),
  );
}

export function isMonthlyBatchSeatSelectionOpen(
  startDate: number,
  tagsMatched: boolean,
): boolean {
  return dayjs().isAfter(
    dayjs(startDate)
      .startOf('months')
      .subtract(tagsMatched ? 20 : 10, 'days')
      .subtract(12, 'hours'),
  );
}
