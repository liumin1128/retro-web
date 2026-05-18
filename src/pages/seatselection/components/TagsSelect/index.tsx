import React from 'react';
import get from 'lodash/get';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { MuiChipsInput } from 'mui-chips-input';
import { FormRenderProps, getHelperText } from '../../utils/forms';

const list = [
  { label: 'ComTech', value: 'ComTech' },
  { label: 'SeatSelectionAdmin', value: 'SeatSelectionAdmin' },
];

function TagsSelect({ field, formState }: FormRenderProps) {
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = getHelperText(get(errors, `${name}.message`, ''));

  const [chips, setChips] = React.useState<string[]>(value || []);

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
}

export default React.forwardRef(TagsSelect);
