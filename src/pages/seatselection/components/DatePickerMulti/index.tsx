import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';

interface Props {
  value: Dayjs[];
  onChange: (value: Dayjs | null) => void;
}

function Day(
  props: PickersDayProps<Dayjs> & { selectedDays?: Dayjs[] | null },
) {
  const { selectedDays, day, ...other } = props;

  let selected = false;
  selectedDays?.forEach((i) => {
    if (i.isSame(day, 'day')) {
      selected = true;
    }
  });

  return <PickersDay {...other} day={day} selected={selected} />;
}

export default function BasicDateCalendar({ value, onChange }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={['day']}
        // value={value}
        onChange={onChange}
        slots={{ day: Day }}
        slotProps={{
          day: {
            selectedDays: value,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}
