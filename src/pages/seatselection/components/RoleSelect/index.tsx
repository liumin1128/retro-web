import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFindRolesQuery } from '@/generated/graphql';

export default React.forwardRef((props, ref) => {
  const { data } = useFindRolesQuery();
  return (
    <Select placeholder="Select Role" multiple fullWidth ref={ref} {...props}>
      {data?.findRoles?.map((i) => {
        return (
          <MenuItem key={i?._id} value={i?._id}>
            {i?.name}
          </MenuItem>
        );
      })}
    </Select>
  );
});
