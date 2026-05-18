import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  DAYS_OF_WEEK,
  getWeeklyButtonColors,
  getWeeklyButtonText,
} from '../utils';
import { WeeklyValues } from '../types';

interface Props {
  values: WeeklyValues;
  onSelect: (index: number) => void;
}

export default function WeeklyPreferenceButtons({ values, onSelect }: Props) {
  return (
    <Stack spacing={0} direction="row">
      {values.map((value, index) => {
        const { backgroundColor, color } = getWeeklyButtonColors(value, index);
        const disabled = index === 0 || index === 6;

        return (
          <Button
            key={DAYS_OF_WEEK[index]}
            disabled={disabled}
            sx={{
              width: 64,
              height: 32,
              outline: '1px #ccc solid',
              textAlign: 'center',
              lineHeight: '32px',
              fontSize: 14,
              cursor: 'pointer',
              backgroundColor,
              borderRadius: 0,
              color,
            }}
            onClick={() => {
              onSelect(index);
            }}
          >
            <div>{getWeeklyButtonText(value, index)}</div>
          </Button>
        );
      })}
    </Stack>
  );
}
