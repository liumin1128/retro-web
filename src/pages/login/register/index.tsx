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

const apiUrl = process.env.API_URL || '';

const schema = yup
  .object({
    username: yup
      .string()
      .max(24)
      .min(6)
      .required('Please Enter your username'),
    email: yup.string().email().required('Please Enter your email'),
    password: yup.string().required('Please Enter your password'),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    // ),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),

    // confirmPassword: yup
    //   .string()
    //   .required()
    //   .test(
    //     'cp-test',
    //     "confirm password doesn's match",
    //     function (confirmPassword) {
    //       const { password } = this.parent;
    //       if (password !== confirmPassword) {
    //         return false;
    //       }
    //       return true;
    //     },
    //   ),
    // password: yup
    //   .string()
    //   .required()
    //   .test('p-test', "confirm password doesn's match", function (password) {
    //     const { confirmPassword } = this.parent;
    //     if (password !== confirmPassword) {
    //       return this.createError({ path: 'confirmPassword' });
    //     }
    //     return true;
    //   }),
  })
  .required();

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [agree, setRemenber] = useState<boolean>(true);

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
    console.log('xxx', e, login);
    alert('comming soon');
    // login({ variables: { input: e } });
  };

  return (
    <Container>
      <Stack sx={{ position: 'absolute', top: 24 }}>
        <IconButton sx={{ color: '#999' }}>
          <Logo sx={{ width: 40, height: 40 }} />
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
                width: 800,
                height: 800,
                margin: '-200px',
              }}
              path="/lottie/adventure/MobileMarketing.json"
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
                <Typography variant="h3">Register in Retro</Typography>
                <Typography variant="body2">
                  Get started absolutely free.
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

                  <TextField
                    {...register('email')}
                    error={!!get(errors, 'email', '')}
                    helperText={`${get(errors, `${'email'}.message`, '')}`}
                    autoComplete="email"
                    label="Email address"
                  />

                  <Password
                    {...register('password')}
                    error={!!get(errors, 'password', '')}
                    helperText={`${get(errors, `${'password'}.message`, '')}`}
                    autoComplete="new-password"
                    label="Password"
                  />

                  <Password
                    {...register('confirmPassword')}
                    error={!!get(errors, 'confirmPassword', '')}
                    helperText={`${get(
                      errors,
                      `${'confirmPassword'}.message`,
                      '',
                    )}`}
                    autoComplete="new-password"
                    label="Confirm Password"
                  />
                </Stack>

                <Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agree}
                        onChange={() => {
                          setRemenber(!agree);
                        }}
                      />
                    }
                    label={
                      <Typography variant="body1" align="left">
                        I agree to Retro{' '}
                        <Link href="/404">Terms of Service</Link> and{' '}
                        <Link href="/404">Privacy Policy</Link>.
                      </Typography>
                    }
                  />
                </Stack>

                <LoadingButton
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={loading}
                  disabled={!agree}
                >
                  Register
                </LoadingButton>

                <Typography variant="body1" align="center">
                  Already have an account?
                  <Link href="/login">Click Login</Link>
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
                <Link component="a" href={`${apiUrl}/oauth/wechat`}>
                  Wechat
                </Link>
              </Stack>
              <Stack>
                <Link component="a" href={`${apiUrl}/oauth/github`}>
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
