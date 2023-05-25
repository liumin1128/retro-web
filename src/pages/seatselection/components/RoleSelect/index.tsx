import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useFindRolesQuery } from '@/generated/graphql';
import get from 'lodash/get';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default React.forwardRef((props, ref) => {
  const { data } = useFindRolesQuery();
  const { field, formState } = props;
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = get(errors, `${name}.message`, '');

  return (
    <FormControl fullWidth>
      <InputLabel id={name}>Select Role</InputLabel>
      <Select
        id={name}
        placeholder="Select Role"
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
        {data?.findRoles?.map((i) => {
          return (
            <MenuItem key={i?._id} value={i?._id}>
              {i?.name}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
});
