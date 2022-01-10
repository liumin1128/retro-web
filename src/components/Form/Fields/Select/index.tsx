import { forwardRef, ForwardedRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const Select = forwardRef(
  ({ options, ...props }: TextFieldProps, ref: ForwardedRef<unknown>) => {
    return (
      <TextField
        {...props}
        inputRef={ref}
        select
        SelectProps={{
          native: true,
        }}
      >
        {options.map((i) => {
          return (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          );
        })}
      </TextField>
    );
  },
);

export default Select;
