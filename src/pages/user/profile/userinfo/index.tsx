import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import {
  useFindUserInfoQuery,
  useUpdateUserInfoMutation,
} from '@/generated/graphql';
import Form, { FormRefInstance } from '@/components/Form';
import AvatarEdit from '@/components/AvatarEdit';
import { uploadBase64 } from '@/service/qiniu';
import { pickObject } from '@/utils/common';
import items from './items';

const Retro: React.FunctionComponent = () => {
  const { data, loading, error } = useFindUserInfoQuery();
  const [updateUser] = useUpdateUserInfoMutation();
  const { enqueueSnackbar } = useSnackbar();

  // console.log('data');
  // console.log(data);

  const formRef = useRef<FormRefInstance>();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const handleSubmit = async (values: Record<string, unknown>) => {
    // console.log('values', values);
    if (values.sex) {
      values.sex = Number(values.sex);
    }

    delete values.username;

    try {
      await updateUser({
        variables: { input: pickObject(values) },
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
    <Box sx={{ maxWidth: 500, margin: 'auto', mb: 8 }}>
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
            birthday: data?.findUserInfo?.birthday
              ? dayjs(Number(data?.findUserInfo?.birthday)).format('YYYY-MM-DD')
              : '',
            sex: data?.findUserInfo?.sex,
            company: data?.findUserInfo?.company,
            position: data?.findUserInfo?.position,
            username: data?.findUserInfo?.username,
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
