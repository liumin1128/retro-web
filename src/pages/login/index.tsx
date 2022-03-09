import { useRef } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import Form, { FormRefInstance } from '@/components/Form';
import { handleLogin } from '@/service/user';
import { LoginUserInput, useLoginLazyQuery } from '@/generated/graphql';
import items from './items';

const apiUrl = process.env.API_URL || '';

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();

  const formRef = useRef<FormRefInstance>();

  const [login] = useLoginLazyQuery({
    onError: (err) => {
      enqueueSnackbar(err.message, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    },
    onCompleted: (data) => {
      handleLogin(data?.login?.token as string);
    },
  });

  const handleSubmit = (e: LoginUserInput) => {
    login({ variables: { input: e } });
  };

  const handleClick = () => {
    formRef.current?.form.handleSubmit(handleSubmit)();
  };

  return (
    <div>
      <Card sx={{ px: 2, py: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Login</Typography>
          <Form ref={formRef} items={items} />
          <Button size="large" variant="contained" onClick={handleClick}>
            Login
          </Button>
        </Stack>
      </Card>

      <br />

      <ul>
        <li>
          <a href={`${apiUrl}/oauth/github`}>github</a>
        </li>
        <li>
          <a href={`${apiUrl}/oauth/wechat`}>wechat</a>
        </li>
      </ul>
    </div>
  );
}
