import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import DatePicker from './components/DatePicker';
import SeatList from './components/SeatList';

const Retro: React.FunctionComponent = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const handleDateChange = (time: Dayjs | null) => {
    if (time) setDate(time);
  };
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
        <Grid container spacing={8}>
          <Grid item>
            <Stack spacing={2}>
              <Typography>Current Date: {date.format('YYYY-MM-DD')}</Typography>
              <Divider />
              <DatePicker value={date} onChange={handleDateChange} />
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <SeatList date={date.format('YYYY-MM-DD')} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Retro;