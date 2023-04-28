import { forwardRef, useEffect, useImperativeHandle, useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props extends RadioGroupProps {
  label: string;
  options: { label: string; value: string }[];
}

const CustomRadio = forwardRef((props: Props, ref) => {
  // console.log('props');
  // console.log(props);

  const { options, error, helperText, form, name, onChange, label, ...other } =
    props;

  const { register, setValue, watch } = form;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    register(name);
  }, [register, name]);

  const onChangeHandler = useCallback(
    (val: unknown) => {
      setValue(name, val);
    },
    [setValue, name],
  );

  const value = watch(name);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        ref={ref}
        value={value}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        {...other}
      >
        {options.map((i) => {
          return (
            <FormControlLabel
              key={i.value}
              value={i.value}
              control={<Radio />}
              label={i.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
});

export default CustomRadio;
