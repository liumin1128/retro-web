import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Table from './components/Table';

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

          <Stack spacing={1} alignItems="flex-end">
            <Typography variant="body1" component="div">
              {date.format('MMMM YYYY')}
            </Typography>
            <ButtonGroup
              aria-label="Disabled elevation buttons"
              color="inherit"
              variant="contained"
            >
              <Tooltip
                title="Previous Month"
                disableFocusListener
                disableTouchListener
                placement="top"
                arrow
              >
                <Button onClick={handleDateChange(-1)}>
                  <ArrowBackIosIcon sx={{ fontSize: 16 }} />
                </Button>
              </Tooltip>

              <Tooltip
                title="Next Month"
                disableFocusListener
                disableTouchListener
                placement="top"
                arrow
              >
                <Button onClick={handleDateChange(1)}>
                  <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Stack>
        </Stack>

        <Table startDate={startDate} endDate={endDate} />

        <br />

        <Link underline="always" href="/seatselection" color="inherit">
          goto seat map
        </Link>
      </Container>
    </Box>
  );
};

export default Retro;
