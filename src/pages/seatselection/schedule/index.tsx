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
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import Table from '../components/ScheduleTable';
import FullScreen from '../components/FullScreen';
import MultiSelect from '../components/MultiSelect';

const Retro: React.FunctionComponent = () => {
  const [date, setDate] = useState<Dayjs>(dayjs().startOf('day'));
  const [fullScreen, setFullScreen] = useState(false);

  const toogleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const handleDateChange = (n: number) => () => {
    setDate(date.add(n, 'month'));
  };

  const modalRef = React.useRef<ModalMethods>(null);

  const startDate = dayjs(date).startOf('month').valueOf();
  const endDate = dayjs(date).endOf('month').valueOf();

  const handleClickMultiSelect = () => {
    modalRef.current?.open({
      title: `Schedule Preferences`,
      showCancel: true,
      render: () => {
        return (
          <Stack style={{ width: 480 }} spacing={1}>
            <MultiSelect startDate={startDate} endDate={endDate} />
          </Stack>
        );
      },
    });
  };

  const toolbar = () => {
    return (
      <>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          {date.format('MMMM YYYY')}
        </Typography>

        {fullScreen ? (
          <Tooltip
            title="FullscreenExit"
            // disableFocusListener
            // disableTouchListener
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
            // disableFocusListener
            // disableTouchListener
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
          // disableFocusListener
          // disableTouchListener
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
          // disableFocusListener
          // disableTouchListener
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

        <Tooltip title="Schedule Preferences" placement="top" arrow>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleClickMultiSelect}
          >
            <ChecklistRtlIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  return (
    <Container>
      {!fullScreen && (
        <Stack direction="row" sx={{ my: 2 }} alignItems="center">
          {toolbar()}
        </Stack>
      )}

      <FullScreen fullScreen={fullScreen} renderToolbar={toolbar}>
        <Table
          startDate={startDate}
          endDate={endDate}
          scroll={
            fullScreen
              ? {
                  x: 2000,
                  y: window.innerHeight - 120,
                }
              : {
                  x: 2000,
                }
          }
        />
      </FullScreen>

      <Modal ref={modalRef} showCancel={false} showConfirm={false} />
    </Container>
  );
};

export default Retro;
