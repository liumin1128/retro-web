import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export const statusColorMap = {
  WFH: '#0e63b6',
  AL: '#fed563',
  AM: '#fed563',
  PM: '#fed563',
  MC: '#f44336',
} as Record<string, string>;

export const workDayColorMap = {
  0: '#f9f9f9',
  1: '#ffffff',
  2: '#ffffff',
  3: '#ffffff',
  4: '#ffffff',
  5: '#ffffff',
  6: '#f9f9f9',
} as Record<string, string>;

export default [
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
    value: 'None',
    label: 'clear status',
    bgcolor: '#f5f5f5',
    color: '#999999',
    icon: <DoNotDisturbIcon />,
  },
];
