import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { yupResolver } from '@hookform/resolvers/yup';

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
}

const MessageForm: React.FunctionComponent<IFormProps> = ({
  onSubmit,
  defaultValues,
  placeholder,
  color,
}) => {
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
        handleSubmit(onSubmit)(e);
        reset();
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
          label={placeholder}
          variant="outlined"
          fullWidth
          multiline
          minRows={2}
          error={!!errors?.content}
          helperText={errors?.content?.message}
          {...register('content', { required: true })}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleSubmit(onSubmit)(e);
              reset();
            }
          }}
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          color={color}
          type="submit"
        >
          Send
        </Button>
      </Stack>
    </form>
  );
};

MessageForm.defaultProps = {
  placeholder: 'Content',
};

export default MessageForm;
