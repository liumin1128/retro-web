import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
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

  const handleMultiChange = (days: Dayjs[]) => {
    const list = date;
    days.forEach((day) => {
      if (date.findIndex((i) => i.isSame(day, 'day')) === -1) {
        list.push(day);
      }
    });
    setDate([...list]);
  };

  return (
    <Box>
      <Container sx={{}}>
        <Typography variant="h1">Optional Date</Typography>
        <br />
        <Typography variant="body1">Set selectable dates</Typography>
        <br />
        <br />

        <Grid container spacing={3}>
          <Grid item xs md="auto">
            <Stack spacing={2}>
              <Typography variant="h6">This month</Typography>
              <Card>
                <DatePicker
                  currentMonth={dayjs().startOf('month')}
                  value={date}
                  onChange={handleDateChange}
                  onMultiChange={handleMultiChange}
                />
              </Card>
            </Stack>
          </Grid>
          <Grid item xs md="auto">
            <Stack spacing={2}>
              <Typography variant="h6">Next month</Typography>

              <Card>
                <DatePicker
                  currentMonth={dayjs().startOf('month').add(1, 'month')}
                  value={date}
                  onChange={handleDateChange}
                  onMultiChange={handleMultiChange}
                />
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <br />
        <br />
        <Button variant="contained">Save</Button>
      </Container>
    </Box>
  );
};

export default Retro;
