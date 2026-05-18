import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

type Holidays = Record<string, string[]>;

const HOLIDAYS_BY_YEAR: Record<string, Holidays> = {
  2024: {
    元旦: ['2023-12-30', '2024-01-01'],
    春节: ['2024-02-10', '2024-02-17'],
    清明: ['2024-04-04', '2024-04-06'],
    劳动节: ['2024-05-01', '2024-05-05'],
    端午: ['2024-06-08', '2024-06-10'],
    中秋: ['2024-09-15', '2024-09-17'],
    国庆: ['2024-10-01', '2024-10-07'],
  },
  2025: {
    元旦: ['2024-12-30', '2025-01-01'],
    春节: ['2025-01-28', '2025-02-04'],
    清明: ['2025-04-04', '2025-04-06'],
    劳动节: ['2025-05-01', '2025-05-05'],
    端午: ['2025-05-31', '2025-06-02'],
    国庆: ['2025-10-01', '2025-10-05'],
    中秋: ['2025-10-05', '2025-10-08'],
  },
  2026: {
    元旦: ['2026-01-01', '2026-01-03'],
    春节: ['2026-02-15', '2026-02-23'],
    清明: ['2026-04-04', '2026-04-06'],
    劳动节: ['2026-05-01', '2026-05-05'],
    端午: ['2026-06-19', '2026-06-21'],
    中秋: ['2026-09-25', '2026-09-27'],
    国庆: ['2026-10-01', '2026-10-07'],
  },
};

export function getHolidayName(day: dayjs.Dayjs): string | undefined {
  const holidays = HOLIDAYS_BY_YEAR[day.format('YYYY')] || {};

  return Object.keys(holidays).find((holidayName) => {
    const dateRange = holidays[holidayName];
    return day.isBetween(dayjs(dateRange[0]), dayjs(dateRange[1]), 'day', '[]');
  });
}
