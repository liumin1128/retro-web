import { useState, forwardRef, ForwardedRef } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const Password = forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<unknown>) => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
      setVisible(!visible);
    };

    return (
      <TextField
        {...props}
        inputRef={ref}
        type={visible ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                onMouseDown={handleClick}
                edge="end"
              >
                {visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
);

export default Password;
