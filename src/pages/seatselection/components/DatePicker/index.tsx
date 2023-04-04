import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Dayjs } from 'dayjs';

interface Props {
  value: Dayjs;
  onChange: (value: Dayjs | null) => void;
}

export default function BasicDateCalendar({ value, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar views={['day']} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}
