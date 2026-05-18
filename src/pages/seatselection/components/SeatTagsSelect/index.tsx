import React from 'react';
import get from 'lodash/get';
import { MuiChipsInput } from 'mui-chips-input';
import { FormRenderProps, getHelperText } from '../../utils/forms';

function SeatTagsSelect({ field, formState }: FormRenderProps) {
  const { onChange, value, name } = field;
  const { errors } = formState;

  const error = !!get(errors, name, '');
  const helperText = getHelperText(get(errors, `${name}.message`, ''));

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
}

export default React.forwardRef(SeatTagsSelect);
