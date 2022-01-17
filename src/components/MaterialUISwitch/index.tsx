import Switch from '@mui/material/Switch';
import { styled, useTheme } from '@mui/material/styles';
import { useChangeThemePaletteMode } from '@/context/globalSettings';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: "'🌛'",
        lineHeight: '32px',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.success.main
        : theme.palette.warning.main,
    width: 32,
    height: 32,
    '&:before': {
      content: "'☀️'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      lineHeight: '32px',
      textAlign: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function MaterialUISwitchButton() {
  const theme = useTheme();
  const changeThemePaletteMode = useChangeThemePaletteMode();

  return (
    <MaterialUISwitch
      sx={{ m: 1 }}
      checked={theme.palette.mode === 'dark'}
      onChange={(_, checked: boolean) => {
        changeThemePaletteMode(checked ? 'dark' : 'light');
      }}
    />
  );
}
