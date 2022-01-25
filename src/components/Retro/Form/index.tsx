import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import IconCamera from '@mui/icons-material/CameraAltOutlined';
import { yupResolver } from '@hookform/resolvers/yup';
import Wrapper from './Upload/Wrapper';
import Pictures from './Upload/Pictures';
import { uploadItem } from '@/service/qiniu';

const schema = yup
  .object({
    content: yup.string().required(),
  })
  .required();

interface Values {
  content: string;
}

interface IFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: Values) => void;
  defaultValues?: Values;
  placeholder?: string;
  color?: string;
  autoFocus?: boolean;
}

const MessageForm: React.FunctionComponent<IFormProps> = ({
  onSubmit,
  defaultValues,
  placeholder,
  color,
  autoFocus,
}) => {
  const picturesRef = useRef();
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(async (values) => {
          setLoading(true);
          const pictures = picturesRef?.current?.get();
          if (Array.isArray(pictures) && pictures.length > 0) {
            // eslint-disable-next-line no-param-reassign
            values.pictures = await uploadItem(pictures);
          }
          await onSubmit(values);
          picturesRef?.current?.reset();
          reset();
          setLoading(false);
        })(e);
      }}
    >
      <Stack
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
        spacing={2}
      >
        <TextField
          autoFocus={autoFocus}
          label={placeholder}
          variant="outlined"
          fullWidth
          multiline
          minRows={2}
          error={!!errors?.content}
          helperText={errors?.content?.message}
          {...register('content', { required: true })}
          type="submit"
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleSubmit(onSubmit)(e);
              reset();
            }
          }}
        />

        <Pictures
          ref={picturesRef}
          onChange={(values) => {
            console.log('values');
            console.log(values);
          }}
        />

        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Wrapper
            onChange={(e) => {
              picturesRef?.current?.onChange(e);
            }}
          >
            <IconButton>
              <IconCamera />
            </IconButton>
          </Wrapper>
          <Button
            disabled={loading}
            loading={loading}
            size="large"
            variant="contained"
            color={color}
            type="submit"
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

MessageForm.defaultProps = {
  placeholder: 'Content',
};

export default MessageForm;
