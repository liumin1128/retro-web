import { useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react';
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

    useImperativeHandle(ref, () => ({
      ref,
    }));

    return (
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                onMouseDown={handleClick}
                edge="end"
              >
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
        type={visible ? 'text' : 'password'}
      />
    );
  },
);

export default Password;
