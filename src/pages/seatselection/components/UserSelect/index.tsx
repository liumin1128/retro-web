import React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import debounce from 'lodash/debounce';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFindUsersLazyQuery } from '@/generated/graphql';

export default React.forwardRef((props, ref) => {
  const [findUsers, { loading, data }] = useFindUsersLazyQuery();

  const debounceFindUsers = debounce(findUsers, 500);

  const fetch = (search?: string) => {
    debounceFindUsers({ variables: { search } });
  };

  return (
    <Autocomplete
      {...props}
      multiple
      ref={ref}
      options={data?.findUsers || []}
      loading={loading}
      getOptionLabel={(option) => option?.nickname as string}
      isOptionEqualToValue={(option, value) => option?._id === value?._id}
      renderTags={(value, getTagProps) => {
        return (
          <div>
            {value.map((i, index: number) => {
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={i?._id}
                  avatar={<Avatar alt="Natacha" src={i?.avatarUrl as string} />}
                  label={i?.nickname}
                  // variant="outlined"
                />
              );
            })}
          </div>
        );
      }}
      renderOption={(op, option) => {
        return (
          <li {...op} key={option?._id}>
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
              <Avatar src={option?.avatarUrl as string} />
              <Stack>
                <Typography>{option?.nickname}</Typography>
                <Typography variant="caption">{option?._id}</Typography>
              </Stack>
            </Stack>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search by nickname"
          onChange={(e) => fetch(e.target.value as string)}
        />
      )}
    />
  );
});
