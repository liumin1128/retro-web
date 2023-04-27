import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import AvatarEdit from '@/components/AvatarEdit';

interface IUploadProps {
  name: string;
  form: UseFormReturn<FieldValues, object>;
}

const Upload = forwardRef((props: IUploadProps, ref: ForwardedRef<unknown>) => {
  const { form, name, error } = props;

  const { register, setValue, watch } = form;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    register(name);
  }, [register, name]);

  const onChangeHandler = useCallback(
    (files: unknown[]) => {
      setValue(name, files);
    },
    [setValue, name],
  );

  const value = watch(name);
  let defaultValue;
  if (value) {
    defaultValue = value;
  }

  return (
    <Box>
      <AvatarEdit defaultValue={defaultValue} onChange={onChangeHandler} />
      {error && (
        <FormHelperText error={error}>Plseae upload a avatar</FormHelperText>
      )}
    </Box>
  );
});

export default Upload;
