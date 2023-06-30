import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Table from '../components/ScheduleTable';
import FullScreen from '../components/FullScreen';

const Retro: React.FunctionComponent = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().startOf('day'));
  const [fullScreen, setFullScreen] = useState(false);

  const toogleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const handleDateChange = (n: number) => () => {
    setDate(date.add(n, 'month'));
  };

  const startDate = dayjs(date).startOf('month').valueOf();
  const endDate = dayjs(date).endOf('month').valueOf();

  const toolbar = () => {
    return (
      <>
        {fullScreen ? (
          <Tooltip
            title="FullscreenExit"
            disableFocusListener
            disableTouchListener
            placement="top"
            arrow
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toogleFullScreen}
            >
              <FullscreenExitIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip
            title="FullScreen"
            disableFocusListener
            disableTouchListener
            placement="top"
            arrow
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toogleFullScreen}
            >
              <FullscreenIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip
          title="Previous Month"
          disableFocusListener
          disableTouchListener
          placement="top"
          arrow
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleDateChange(-1)}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Next Month"
          disableFocusListener
          disableTouchListener
          placement="top"
          arrow
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleDateChange(1)}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Tooltip>

        <Typography component="div" sx={{ flexGrow: 1 }}>
          {date.format('MMMM YYYY')}
        </Typography>
      </>
    );
  };

  return (
    <Container>
      <Stack direction="row" sx={{ mb: 2 }} alignItems="center">
        {toolbar()}
      </Stack>

      <FullScreen fullScreen={fullScreen} renderToolbar={toolbar}>
        <Table startDate={startDate} endDate={endDate} />
      </FullScreen>
    </Container>
  );
};

export default Retro;
