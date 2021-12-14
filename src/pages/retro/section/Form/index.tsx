import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@/components/Retro/Card';

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
}

const MessageForm: React.FunctionComponent<IFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // content: '+11860000000',
      // password: 'sword.111',
    },
  });

  return (
    <Card sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            label="Conetent"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            error={!!errors?.content}
            helperText={errors?.content?.message}
            {...register('content', { required: true })}
          />

          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            // sx={{ color: '#000000', fontWeight: 'bold' }}
          >
            Send
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default MessageForm;