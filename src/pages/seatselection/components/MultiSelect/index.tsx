import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { getMonthDays } from '@/utils/common';
import Button from '@mui/material/Button';
import { getStorage, setStorage } from '@/utils/store';
import list from '@/pages/seatselection/components/SeatList/seatData';
import {
  useFindUserInfoQuery,
  useCreateScheduleMutation,
  useToggleUserToSeatMutation,
  useFindSeatsQuery,
} from '@/generated/graphql';
import dayjs, { Dayjs } from 'dayjs';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import SeatsList from './SeatList';

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

interface Props {
  startDate: number;
}

interface Log {
  status: string;
  text: string;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const cacheKey = 'schedule.multi.values';

const seatIds: string[] = [];

// eslint-disable-next-line array-callback-return
list.map((i) => {
  // eslint-disable-next-line array-callback-return
  i.list.map((j) => {
    // eslint-disable-next-line array-callback-return
    j.seats.map((k) => {
      seatIds.push(k._id);
    });
  });
});

function isArrayContained(a = [], b = []) {
  for (let i = 0; i < b.length; i += 1) {
    if (a.indexOf(b[i]) === -1) {
      return false;
    }
  }
  return true;
}

export default function MultiSelect(props: Props) {
  const { startDate } = props;

  const [setting, setSetting] = useState(false);
  const [logs, setLogs] = useState<Record<string, Log>>({});
  const [values, setValues] = useState<number[]>([-1, -1, -1, -1, -1, -1, -1]);
  const modalRef = React.useRef<ModalMethods>(null);
  const userRes = useFindUserInfoQuery();
  const seatsRes = useFindSeatsQuery();

  const [createSchedule] = useCreateScheduleMutation();
  const [toggleUserToSeat] = useToggleUserToSeatMutation();

  useEffect(() => {
    const v = getStorage(cacheKey);
    if (v) {
      setValues(v);
    }
  }, []);

  useEffect(() => {
    setStorage(cacheKey, values);
  }, [values]);

  const isAdmin =
    userRes.data?.findUserInfo?.tags?.includes('SeatSelectionAdmin');

  const toggleSchedule = async (args: {
    status: string;
    date: number;
    user?: string;
    comment?: string;
  }) => {
    await createSchedule({ variables: args });
  };

  const handleClickSelect = (idx: number) => {
    modalRef.current?.open({
      title: `Select seat or WFH`,
      render: () => {
        return (
          <Stack style={{ width: 480 }} spacing={1}>
            <SeatsList
              disabled={false}
              onChange={(value) => {
                setValues((prev) => {
                  const next = [...prev];
                  next[idx] = value;
                  return next;
                });
                modalRef.current?.close();
              }}
            />
          </Stack>
        );
      },
    });
  };

  const toggleSeat = async ({
    seat,
    date,
    user,
  }: {
    seat: string;
    date: number;
    user: string;
  }) => {
    await toggleUserToSeat({ variables: { user, seat, date } });
  };

  const handleSubmit = async () => {
    const days = getMonthDays(dayjs(startDate).format('YYYY-MM'));
    const currentUser = userRes?.data?.findUserInfo;

    const processDay = async (day: Dayjs, seat: number) => {
      if (day.isBefore(dayjs().startOf('day'))) {
        setLogs((prev) => {
          return {
            ...prev,
            [day.format('YYYY-MM-DD ddd')]: {
              status: 'info',
              text: 'date invalid',
            },
          };
        });
        return;
      }
      if (seat === -1) {
        setLogs((prev) => {
          return {
            ...prev,
            [day.format('YYYY-MM-DD ddd')]: {
              status: 'info',
              text: 'skip',
            },
          };
        });
        return;
      }
      if (seat === 0) {
        try {
          await toggleSchedule({
            status: 'WFH',
            date: day.valueOf(),
            // user: data?.findUserInfo?._id,
            user: currentUser?._id as string,
          });
          setLogs((prev) => {
            return {
              ...prev,
              [day.format('YYYY-MM-DD ddd')]: {
                status: 'success',
                text: 'set WFH success',
              },
            };
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error);
          setLogs((prev) => {
            return {
              ...prev,
              [day.format('YYYY-MM-DD ddd')]: {
                status: 'error',
                text: `${error.message}`,
              },
            };
          });
        }
      }
      if (seat > 0) {
        const seatID = seatIds[seat - 1];

        if (!isAdmin) {
          if (!currentUser) {
            setLogs((prev) => {
              return {
                ...prev,
                [day.format('YYYY-MM-DD ddd')]: {
                  status: 'error',
                  text: `user not found`,
                },
              };
            });
            return;
          }

          const currentSeat = seatsRes.data?.findSeats?.find(
            (i) => i?._id === seatID,
          );

          if (!currentSeat) {
            setLogs((prev) => {
              return {
                ...prev,
                [day.format('YYYY-MM-DD ddd')]: {
                  status: 'error',
                  text: `seat not found`,
                },
              };
            });
            return;
          }

          const tagsMatched = isArrayContained(
            currentUser?.tags as string[],
            currentSeat?.tags as string[],
          );

          const timeOk = dayjs().isAfter(
            dayjs(startDate)
              .startOf('months')
              .subtract(tagsMatched ? 20 : 10, 'days')
              .subtract(12, 'hours'),
          );

          if (!timeOk) {
            setLogs((prev) => {
              return {
                ...prev,
                [day.format('YYYY-MM-DD ddd')]: {
                  status: 'error',
                  text: `out of time range`,
                },
              };
            });
            return;
          }
        }
        try {
          await toggleSeat({
            seat: seatID,
            date: day.valueOf(),
            // user: data?.findUserInfo?._id as string,
            user: currentUser?._id as string,
          });
          setLogs((prev) => {
            return {
              ...prev,
              [day.format('YYYY-MM-DD ddd')]: {
                status: 'success',
                text: `set Seat No: ${seat} success`,
              },
            };
          });
        } catch (error) {
          setLogs((prev) => {
            return {
              ...prev,
              [day.format('YYYY-MM-DD ddd')]: {
                status: 'error',
                text: `${error.message}`,
              },
            };
          });
        }
      }
    };

    const processDays = async () => {
      setSetting(true);

      for (let i = 0; i < days.length; i += 1) {
        const zIdx = days[i].weekday() % 7;
        const seat = values[zIdx];
        // eslint-disable-next-line no-await-in-loop
        await processDay(days[i], seat);
        // eslint-disable-next-line no-await-in-loop
        await sleep(300);
      }

      setSetting(false);
    };

    processDays();
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

      <Stack spacing={0} direction="row">
        {[1, 2, 3, 4, 5, 6, 7].map((i, idx) => {
          const value = values[idx];
          let text = daysOfWeek[idx];
          if (value === 0) {
            text = 'WFH';
          }
          if (value > 0) {
            text = values[idx].toString();
          }

          let backgroundColor = '#ffffff';
          let color = '';
          if (i === 1 || i === 7) {
            backgroundColor = '#f8f8f8';
          }
          if (value === 0) {
            backgroundColor = '#0e63b6';
            color = 'white';
          }
          if (value > 0) {
            backgroundColor = '#389e0d';
            color = 'white';
          }

          let disabled;
          if (i === 1 || i === 7) {
            disabled = true;
          }

          return (
            <Button
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
                handleClickSelect(idx);
              }}
            >
              <div>{text}</div>
            </Button>
          );
        })}
      </Stack>
      <br />

      <Button disabled={setting} onClick={handleSubmit} variant="contained">
        Start
      </Button>
      <br />
      <br />

      <Stack>
        {Object.keys(logs).map((i) => {
          let color = '';
          if (logs[i].status === 'success') {
            color = 'green';
          }
          if (logs[i].status === 'error') {
            color = 'red';
          }
          return (
            <Typography key={i} variant="caption" color={color}>
              {i} - {logs[i].text}
            </Typography>
          );
        })}
      </Stack>

      <Modal ref={modalRef} showCancel={false} showConfirm={false} />
    </div>
  );
}
