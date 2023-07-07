import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Tooltip from '@mui/material/Tooltip';

// import Typography from '@mui/material/Typography';
// import list from '@/pages/seatselection/components/StatusList/seatData';

const list = [
  {
    value: 'Office',
    label: 'clear status',
    bgcolor: '#f5f5f5',
    color: '#999999',
    icon: <DoNotDisturbIcon />,
  },
  {
    value: 'WFH',
    label: 'Work From Home',
    bgcolor: '#f5f5f5',
    color: '#0e63b6',
    icon: <HomeIcon />,
  },
  {
    value: 'AL',
    label: 'annual leave (full)',
    bgcolor: '#f5f5f5',
    color: '#fed563',
    icon: <DirectionsRunIcon />,
  },
  {
    value: 'AM',
    label: 'annual leave (AM)',
    bgcolor: '#f5f5f5',
    color: '#fed563',
    icon: <DirectionsRunIcon />,
  },
  {
    value: 'PM',
    label: 'annual leave (PM)',
    bgcolor: '#f5f5f5',
    color: '#fed563',
    icon: <DirectionsRunIcon />,
  },
  {
    value: 'MC',
    label: 'medical leave',
    bgcolor: '#f5f5f5',
    color: '#ff0000',
    icon: <MedicalServicesIcon />,
  },
  {
    value: 'DT',
    label: 'Duty Travel',
    bgcolor: '#f5f5f5',
    color: '#fed563',
    icon: <DirectionsRunIcon />,
  },
  {
    value: 'Other',
    label: 'Other',
    bgcolor: '#f5f5f5',
    color: '#fed563',
    icon: <DirectionsRunIcon />,
  },
];

interface Props {
  value?: string;
  onChange: (status: string) => void;
}

export default function StatusList({ value = 'Office', onChange }: Props) {
  return (
    <div>
      <Box sx={{ maxWidth: 300 }}>
        {list.map((i) => {
          return (
            <Tooltip placement="top" title={i.label} arrow key={i.value}>
              <Button
                onClick={() => {
                  onChange(i.value);
                }}
                variant={value === i.value ? 'contained' : 'outlined'}
                sx={{ width: '64px', height: '32px', borderRadius: '0px' }}
              >
                {i.value}
              </Button>
            </Tooltip>
          );
        })}
      </Box>
    </div>
  );
}
