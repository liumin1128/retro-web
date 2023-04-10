import { useState } from 'react';
import get from 'lodash/get';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { useSnackbar } from 'notistack';
import { LoginUserInput, useLoginLazyQuery } from '@/generated/graphql';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { handleLogin } from '@/service/user';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Lottie from '@/components/Lottie';
import Logo from '@/components/Icon/Logo';
import Password from '@/components/Form/Fields/Password';
import { GITHUB_OAUTH_URL, WECHAT_OAUTH_URL } from '@/configs/base';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();

  const [remember, setRemenber] = useState<boolean>(true);

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [login, { loading }] = useLoginLazyQuery({
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

  const onSubmit = (e: LoginUserInput) => {
    login({ variables: { input: e } });
  };

  return (
    <Container>
      <Stack sx={{ position: 'absolute', top: 24 }}>
        <IconButton>
          <Logo sx={{ width: 48, height: 48, color: '#f2d26e' }} />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
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
          <Stack>
            <Lottie
              sx={{
                width: 648,
                height: 648,
                margin: '-128px',
              }}
              path="/lottie/adventure/Community.json"
              // path="https://imgs.react.mobi/lottie%2Fadventure%2FSocial%2520Media.json"
              // path="https://imgs.react.mobi/lottie%2Fadventure%2FCommunity.json"
              // path="https://imgs.react.mobi/lottie%2Fadventure%2FTeam%2520Work.json"
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            flex: 1,
            maxWidth: 480,
          }}
        >
          <Stack spacing={4}>
            <Stack
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Stack>
                <Typography variant="h3">Sign in to Retro</Typography>
                <Typography variant="body2">
                  Enter your details below.
                </Typography>
              </Stack>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <Stack spacing={3}>
                  <TextField
                    {...register('username')}
                    error={!!get(errors, 'username', '')}
                    helperText={`${get(errors, `${'username'}.message`, '')}`}
                    autoComplete="username"
                    label="Username"
                  />

                  <Password
                    {...register('password')}
                    error={!!get(errors, 'password', '')}
                    helperText={`${get(errors, `${'password'}.message`, '')}`}
                    autoComplete="current-password"
                    label="Password"
                  />
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

                  <Link href="/Forgot password">Forgot password?</Link>
                </Stack>

                <LoadingButton
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={loading}
                >
                  Login
                </LoadingButton>

                <Typography variant="body1" align="center">
                  Don’t have an account?
                  <Link href="/register">Get started</Link>
                </Typography>
              </Stack>
            </form>

            <Divider>or</Divider>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <Stack>
                <Link component="a" href={WECHAT_OAUTH_URL}>
                  Wechat
                </Link>
              </Stack>
              <Stack>
                <Link component="a" href={GITHUB_OAUTH_URL}>
                  Github
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
