import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import SeatList from '../SeatList';
import StatusList from '../StatusList';
import { Info, RowItem } from '../../types';

interface Props {
  day: dayjs.Dayjs;
  info: Info;
  isAdmin?: boolean;
  row: RowItem;
  onStatusChange: (status: string, comment?: string) => Promise<void>;
  onSeatChange: (seat: string) => Promise<void>;
}

export default function EditSchedulePanel({
  day,
  info,
  isAdmin,
  row,
  onStatusChange,
  onSeatChange,
}: Props) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" sx={{ fontSize: 12 }}>
        Status
      </Typography>
      <StatusList value={info?.status} onChange={onStatusChange} />
      <Typography variant="h6" sx={{ fontSize: 12 }}>
        SeatNo
      </Typography>
      <SeatList
        currentUser={row}
        date={day.valueOf()}
        isAdmin={isAdmin}
        onChange={onSeatChange}
      />
    </Stack>
  );
}
