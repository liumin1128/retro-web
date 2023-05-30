import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Table from '../components/ScheduleTable';
import MonthSelect from '../components/MonthSelect';

const Retro: React.FunctionComponent = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().startOf('day'));

  const handleDateChange = (n: number) => () => {
    setDate(date.add(n, 'month'));
  };

  const startDate = dayjs(date).startOf('month').valueOf();
  const endDate = dayjs(date).endOf('month').valueOf();

  return (
    <Box>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Seat Selection
          </Typography>
          <MaterialUISwitch />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Stack direction="row" sx={{ mb: 2 }} alignItems="center">
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Seat Table
          </Typography>
          <MonthSelect date={date} onChange={handleDateChange} />
        </Stack>

        <Table startDate={startDate} endDate={endDate} />

        <br />
      </Container>
    </Box>
  );
};

export default Retro;
