import { useState } from 'react';
import { Link } from 'umi';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonLink from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import { useSnackbar } from 'notistack';
// import Form, { FormRefInstance } from '@/components/Form';
import Lottie from '@/components/Lottie';
import Password from '@/components/Form/Fields/Password';
// import { handleLogin } from '@/service/user';
// import { LoginUserInput, useLoginLazyQuery } from '@/generated/graphql';
// import items from './items';

const apiUrl = process.env.API_URL || '';

export default function Home() {
  const [remember, setRemenber] = useState<boolean>(true);
  // const { enqueueSnackbar } = useSnackbar();

  // const formRef = useRef<FormRefInstance>();

  // const [login] = useLoginLazyQuery({
  //   onError: (err) => {
  //     enqueueSnackbar(err.message, {
  //       variant: 'error',
  //       autoHideDuration: 3000,
  //     });
  //   },
  //   onCompleted: (data) => {
  //     handleLogin(data?.login?.token as string);
  //   },
  // });

  // const handleSubmit = (e: LoginUserInput) => {
  //   login({ variables: { input: e } });
  // };

  // const handleClick = () => {
  //   formRef.current?.form.handleSubmit(handleSubmit)();
  // };

  const renderLeft = () => {
    return (
      <Stack>
        <Stack>
          <Lottie
            sx={{
              width: 800,
              height: 800,
              margin: '-200px',
            }}
            path="https://imgs.react.mobi/lottie%2Fadventure%2FTeam%2520Work.json"
          />
        </Stack>
      </Stack>
    );
  };

  const renderRight = () => {
    return (
      <Stack spacing={4}>
        <Stack>
          <Typography variant="h3">Sign in to Retro</Typography>
          <Typography variant="body2">Enter your details below.</Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={3}>
            <TextField label="username" />
            <Password label="Password" />
          </Stack>

          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={() => {
                    setRemenber(!remember);
                  }}
                />
              }
              label="Remember me"
            />
            <ButtonLink to="/Forgot password" component={Link}>
              Forgot password?
            </ButtonLink>
          </Stack>

          <Button size="large" variant="contained" onClick={() => {}}>
            Login
          </Button>

          <Typography variant="body1" align="center">
            Don’t have an account?
            <ButtonLink to="/register" component={Link}>
              Get started
            </ButtonLink>
          </Typography>
        </Stack>

        <Divider>or</Divider>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Stack>
            <ButtonLink href={`${apiUrl}/oauth/wechat`}>Wechat</ButtonLink>
          </Stack>

          <Stack>
            <ButtonLink href={`${apiUrl}/oauth/github`}>Github</ButtonLink>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <Container>
      <Stack
        direction="row"
        spacing={8}
        sx={{
          justifyContent: 'center',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <Stack
          sx={{
            flex: 1,
            display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
          }}
        >
          {renderLeft()}
        </Stack>

        <Stack
          sx={{
            flex: 1,
            maxWidth: 480,
          }}
        >
          {renderRight()}
        </Stack>
      </Stack>
    </Container>
  );
}
