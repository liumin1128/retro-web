import { getStorage, setStorage } from '@/utils/store';
import { WeeklyValues } from './types';

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DEFAULT_WEEKLY_VALUES = [-1, -1, -1, -1, -1, -1, -1];

const CACHE_KEY = 'schedule.multi.values';

export function loadWeeklyValues(): WeeklyValues {
  const values = getStorage(CACHE_KEY);

  if (Array.isArray(values)) {
    return values;
  }

  return DEFAULT_WEEKLY_VALUES;
}

export function storeWeeklyValues(values: WeeklyValues): void {
  setStorage(CACHE_KEY, values);
}

export function getWeeklyButtonText(value: number, index: number): string {
  if (value === 0) {
    return 'WFH';
  }

  if (value > 0) {
    return value.toString();
  }

  return DAYS_OF_WEEK[index];
}

export function getWeeklyButtonColors(
  value: number,
  index: number,
): {
  backgroundColor: string;
  color: string;
} {
  if (value === 0) {
    return {
      backgroundColor: '#0e63b6',
      color: 'white',
    };
  }

  if (value > 0) {
    return {
      backgroundColor: '#389e0d',
      color: 'white',
    };
  }

  if (index === 0 || index === 6) {
    return {
      backgroundColor: '#f8f8f8',
      color: '',
    };
  }

  return {
    backgroundColor: '#ffffff',
    color: '',
  };
}
