import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';
import { getMonthWorkDays } from '@/utils/common';

interface Props {
  value: Dayjs[];
  onChange: (value: Dayjs | null) => void;
  onMultiChange: (value: Dayjs[]) => void;
  currentMonth: Dayjs;
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

function SelectWorkDays(props: {
  onMultiChange: (value: Dayjs[]) => void;
  currentMonth: Dayjs;
}) {
  const { onMultiChange, currentMonth } = props;
  const onClick = () => {
    onMultiChange(getMonthWorkDays(currentMonth.format('YYYY-MM-DD')));
  };
  return <Button onClick={onClick}>Select Workdays</Button>;
}

export default function BasicDateCalendar({
  value,
  onChange,
  onMultiChange,
  currentMonth,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={['day']}
        value={currentMonth}
        disableHighlightToday
        onChange={onChange}
        slots={{
          day: Day,
          previousIconButton: () => null,
          nextIconButton: SelectWorkDays,
        }}
        slotProps={{
          day: {
            selectedDays: value,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
          nextIconButton: {
            onMultiChange,
            currentMonth,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}
