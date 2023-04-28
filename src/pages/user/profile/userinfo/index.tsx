import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import {
  useFindUserInfoQuery,
  useUpdateUserInfoMutation,
} from '@/generated/graphql';
import Form, { FormRefInstance } from '@/components/Form';
import AvatarEdit from '@/components/AvatarEdit';
import items from './items';
import { uploadBase64 } from '@/service/qiniu';

const Retro: React.FunctionComponent = () => {
  const { data, loading, error } = useFindUserInfoQuery();
  const [updateUser] = useUpdateUserInfoMutation();
  const { enqueueSnackbar } = useSnackbar();

  const formRef = useRef<FormRefInstance>();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const handleSubmit = async (values: unknown) => {
    try {
      await updateUser({
        variables: { input: pickBy(values, (value) => !isEmpty(value)) },
      });
      enqueueSnackbar('Update UserInfo Success', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickSubmit = () => {
    formRef.current?.form.handleSubmit(handleSubmit)();
  };

  const handleUpdateAvatar = async (base64: string) => {
    try {
      const key = await uploadBase64(base64);
      await updateUser({
        variables: { input: { avatarUrl: key } },
      });
      enqueueSnackbar('Update Avatar Success', {
        variant: 'success',
        autoHideDuration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">Avatar</Typography>
        <AvatarEdit
          defaultValue={data?.findUserInfo?.avatarUrl as string}
          onChange={handleUpdateAvatar}
        />
      </Stack>

      <br />
      <br />

      <Stack spacing={3}>
        <Typography variant="h5">Details</Typography>
        <Form
          items={items}
          ref={formRef}
          defaultValues={{
            nickname: data?.findUserInfo?.nickname as string,
            sign: data?.findUserInfo?.sign as string,
          }}
        />
      </Stack>

      <br />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large" onClick={handleClickSubmit}>
          UPDATE DETAILS
        </Button>
      </Box>
    </Box>
  );
};

export default Retro;
