import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import list from '@/pages/seatselection/components/SeatList/seatData';

const status = [
  [
    {
      value: 'PM',
      label: 'annual leave (PM)',
      bgcolor: '#f5f5f5',
      color: '#fed563',
      disabled: true,
    },
    {
      value: 'MC',
      label: 'medical leave',
      bgcolor: '#f5f5f5',
      color: '#ff0000',
      disabled: true,
    },
    {
      value: 'DT',
      label: 'Duty Travel',
      bgcolor: '#f5f5f5',
      color: '#fed563',
      disabled: true,
    },
    {
      value: 'Other',
      label: 'Other',
      bgcolor: '#f5f5f5',
      color: '#fed563',
      disabled: true,
    },
  ],
  [
    {
      value: 'Office',
      label: 'clear status',
      bgcolor: '#f5f5f5',
      color: '#999999',
      disabled: true,
    },
    {
      value: 'WFH',
      label: 'Work From Home',
      bgcolor: '#f5f5f5',
      color: '#0e63b6',
    },
    {
      value: 'AL',
      label: 'annual leave (full)',
      bgcolor: '#f5f5f5',
      color: '#fed563',
      disabled: true,
    },
    {
      value: 'AM',
      label: 'annual leave (AM)',
      bgcolor: '#f5f5f5',
      color: '#fed563',
      disabled: true,
    },
  ],
];

interface Props {
  disabled: boolean;
  onChange: (seat: number) => void;
}

export default function SeatsList(props: Props) {
  const { onChange, disabled } = props;

  return (
    <div>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
            onChange(-1);
          }}
          sx={{
            width: '64px',
            height: '32px',
            borderRadius: '0px',
          }}
        >
          Clear
        </Button>

        <Typography variant="h6" sx={{ fontSize: 12 }}>
          Status
        </Typography>
        <Stack>
          {status.map((line) => {
            return (
              <Stack direction="row">
                {line.map((i) => {
                  return (
                    <Button
                      disabled={i.disabled || disabled}
                      variant="outlined"
                      onClick={() => {
                        onChange(0);
                      }}
                      sx={{
                        width: '64px',
                        height: '32px',
                        borderRadius: '0px',
                      }}
                    >
                      {i.value}
                    </Button>
                  );
                })}
              </Stack>
            );
          })}
        </Stack>

        <Typography variant="h6" sx={{ fontSize: 12 }}>
          Seats
        </Typography>

        {list.map((line) => {
          return (
            <Stack key={line.key}>
              {line.list.map((seats) => {
                return (
                  <Stack key={seats.key}>
                    <ButtonGroup size="small">
                      {seats.seats.map((seat) => {
                        return (
                          <Button
                            disabled={disabled}
                            onClick={() => {
                              onChange(seat.id);
                            }}
                            sx={{
                              width: '64px',
                              borderRadius: '0px',
                              height: '32px',
                            }}
                          >
                            {seat.id}
                          </Button>
                        );
                      })}
                    </ButtonGroup>
                  </Stack>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </div>
  );
}
