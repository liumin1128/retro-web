import React from 'react';
import get from 'lodash/get';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFindRolesQuery } from '@/generated/graphql';
import { FormRenderProps, getHelperText } from '../../utils/forms';

function RoleSelect(
  { field, formState }: FormRenderProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { data } = useFindRolesQuery();
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = getHelperText(get(errors, `${name}.message`, ''));

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
        onChange={(e) => {
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
}

export default React.forwardRef(RoleSelect);
