import React from 'react';
import Stack from '@mui/material/Stack';
import get from 'lodash/get';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MuiChipsInput } from 'mui-chips-input';
import Button from '@mui/material/Button';

const list = [
  { label: 'ComTech', value: 'ComTech' },
  { label: 'SeatSelectionAdmin', value: 'SeatSelectionAdmin' },
];

export default React.forwardRef((props, ref) => {
  const { field, formState } = props;
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = get(errors, `${name}.message`, '');

  const [chips, setChips] = React.useState<string[]>([]);

  const handleChange = (newChips: string[]) => {
    setChips(newChips);
    onChange(newChips);
  };

  const addChips = (str: string) => () => {
    setChips([...chips, str]);
    onChange([...chips, str]);
  };

  return (
    <FormControl fullWidth>
      <Stack spacing={1}>
        <MuiChipsInput
          placeholder="Tags: Type and press enter"
          value={chips}
          onChange={handleChange}
          error={error}
          helperText={helperText}
        />
        <Stack direction="row" spacing={2}>
          {list.map((i) => {
            return (
              <Button key={i.value} size="small" onClick={addChips(i.value)}>
                {i.label}
              </Button>
            );
          })}
        </Stack>
      </Stack>
    </FormControl>
  );
});
