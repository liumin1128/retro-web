import { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Props {
  date: Dayjs;
  onChange: (n: number) => () => void;
}

export default ({ onChange, date }: Props) => {
  return (
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
          <Button variant="contained" onClick={onChange(-1)}>
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
          <Button onClick={onChange(1)} variant="contained">
            <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Stack>
  );
};
