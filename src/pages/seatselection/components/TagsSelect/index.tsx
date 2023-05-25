import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import get from 'lodash/get';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const list = [
  { label: 'ComTech', value: 'ComTech' },
  { label: 'SeatSelectionAdmin', value: 'SeatSelectionAdmin' },
  { label: 'Room1', value: 'Room1' },
  { label: 'Room2', value: 'Room2' },
];

export default React.forwardRef((props, ref) => {
  const { field, formState } = props;
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = get(errors, `${name}.message`, '');

  return (
    <FormControl fullWidth>
      <InputLabel id={name}>Select Tags</InputLabel>
      <Select
        id={name}
        placeholder="Select Tags"
        multiple
        fullWidth
        ref={ref}
        name={name}
        value={value || []}
        onChange={(e, v) => {
          onChange(e);
        }}
        error={error}
      >
        {list?.map((i) => {
          return (
            <MenuItem key={i?.value} value={i?.value}>
              {i?.label}
            </MenuItem>
          );
        })}
      </Select>
      {error ? (
        <FormHelperText error>{helperText}</FormHelperText>
      ) : (
        <FormHelperText>
          At least "ComTech" tag is required to appear in the seat selection
          list
        </FormHelperText>
      )}
    </FormControl>
  );
});
