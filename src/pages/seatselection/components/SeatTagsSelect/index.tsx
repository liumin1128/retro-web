import React from 'react';
import get from 'lodash/get';
import { MuiChipsInput } from 'mui-chips-input';

export default React.forwardRef((props, ref) => {
  const { field, formState } = props;
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = get(errors, `${name}.message`, '');

  const [chips, setChips] = React.useState<string[]>(value || []);

  const handleChange = (newChips: string[]) => {
    setChips(newChips);
    onChange(newChips);
  };

  return (
    <MuiChipsInput
      fullWidth
      placeholder="Tags: Type and press enter"
      value={chips}
      onChange={handleChange}
      error={error}
      helperText={helperText}
    />
  );
});
