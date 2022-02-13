import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import Box from '@mui/material/Box';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import UploadPictures, { url2Item } from '@/components/Upload/Pictures';

interface IUploadProps {
  name: string;
  form: UseFormReturn<FieldValues, object>;
}

const Upload = forwardRef((props: IUploadProps, ref: ForwardedRef<unknown>) => {
  const { form, name } = props;

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
    defaultValue = value.map(url2Item);
  }

  return (
    <Box>
      <UploadPictures defaultValue={defaultValue} onChange={onChangeHandler} />
    </Box>
  );
});

export default Upload;
