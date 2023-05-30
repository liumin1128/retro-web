import React, { Fragment } from 'react';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HomeIcon from '@mui/icons-material/Home';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

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
];

interface Props {
  value?: string;
  onChange: (status: string) => void;
}

export default function StatusList({ value = 'Office', onChange }: Props) {
  return (
    <div>
      <ButtonGroup size="small" aria-label="vertical outlined button group">
        {list.map((i) => {
          return (
            <Button
              key={i.value}
              onClick={() => {
                onChange(i.value);
              }}
              variant={value === i.value ? 'contained' : undefined}
              sx={{ width: '60px', borderRadius: '0px' }}
            >
              {i.value}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}
