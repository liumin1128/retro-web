import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

interface MonthHeaderProps {
  startDate: number;
}

interface DayHeaderProps {
  day: dayjs.Dayjs;
  officeCount: number;
  wfhDaysCount: number;
  userCount: number;
}

export function MonthHeader({ startDate }: MonthHeaderProps) {
  return (
    <Stack sx={{ p: 1 }}>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {dayjs(startDate).format('MMM')}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontStyle: 'italic',
        }}
      >
        {dayjs(startDate).format('YYYY')}
      </Typography>
    </Stack>
  );
}

export function DayHeader({
  day,
  officeCount,
  wfhDaysCount,
  userCount,
}: DayHeaderProps) {
  const halfCount = Math.floor(userCount / 2);
  const shouldShowDivider = officeCount > 0 || wfhDaysCount > 0;

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontStyle: 'italic',
          marginRight: 2,
          color: '#666',
          fontWeight: 'bold',
        }}
      >
        {day.format('ddd')}
      </Typography>
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 'bold',
          fontFamily: 'monospace',
          lineHeight: 1,
          display: 'flex',
          fontStyle: 'italic',
          color: '#333',
          pl: 0.5,
        }}
      >
        {day.format('DD')}
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: '#ccc',
          height: '1em',
          textAlign: 'right',
        }}
      >
        {officeCount > 0 && (
          <span style={{ color: '#389e0d' }}>{officeCount}</span>
        )}
        {shouldShowDivider && ' | '}
        {wfhDaysCount > 0 && (
          <span
            style={{
              color: wfhDaysCount > halfCount ? 'red' : '#0e63b6',
            }}
          >
            {wfhDaysCount}
          </span>
        )}
      </Typography>
    </Box>
  );
}
