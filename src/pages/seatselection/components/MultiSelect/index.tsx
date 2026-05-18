import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import SubmitLogs from './components/SubmitLogs';
import WeeklyPreferenceButtons from './components/WeeklyPreferenceButtons';
import useWeeklySchedule from './hooks/useWeeklySchedule';
import SeatsList from './SeatList';

interface Props {
  startDate: number;
}

export default function MultiSelect({ startDate }: Props) {
  const modalRef = React.useRef<ModalMethods>(null);
  const { logs, setting, values, setValue, submit } =
    useWeeklySchedule(startDate);

  const handleClickSelect = (index: number): void => {
    modalRef.current?.open({
      title: 'Select seat or WFH',
      render: () => {
        return (
          <Stack style={{ width: 480 }} spacing={1}>
            <SeatsList
              disabled={false}
              onChange={(value) => {
                setValue(index, value);
                modalRef.current?.close();
              }}
            />
          </Stack>
        );
      },
    });
  };

  return (
    <div>
      <Typography>Start by setting your weekly schedule preferences</Typography>
      <Typography>
        Click the “Start” button below to set the current month
      </Typography>
      <Typography>
        If the preferences fail to apply, adjust them manually
      </Typography>
      <Typography variant="caption">
        * Preferences are saved locally in the browser
      </Typography>

      <br />
      <br />

      <WeeklyPreferenceButtons values={values} onSelect={handleClickSelect} />
      <br />

      <Button disabled={setting} onClick={submit} variant="contained">
        Start
      </Button>
      <br />
      <br />

      <SubmitLogs logs={logs} />

      <Modal ref={modalRef} showCancel={false} showConfirm={false} />
    </div>
  );
}
