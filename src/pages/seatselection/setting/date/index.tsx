import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DatePicker from '../../components/DatePickerMulti';

const Retro: React.FunctionComponent = () => {
  const [date, setDate] = useState<Dayjs[]>([]);
  const handleDateChange = (day: Dayjs | null) => {
    if (date.findIndex((i) => i.isSame(day, 'day')) !== -1) {
      setDate(date.filter((i) => !i.isSame(day, 'day')));
    } else {
      setDate([...date, day as Dayjs]);
    }
  };

  return (
    <Box>
      <Container sx={{}}>
        <Typography variant="h1">Optional Date</Typography>
        <br />
        <Typography variant="body1">
          Set selectable dates, default to select workdays, and automatically
          deselect dates from the month before last.
        </Typography>
        <br />
      </Container>
      <DatePicker value={date} onChange={handleDateChange} />
    </Box>
  );
};

export default Retro;
