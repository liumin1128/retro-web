import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useFindUserInfoQuery } from '@/generated/graphql';
import Form, { FormRefInstance } from '@/components/Form';
import AvatarEdit from '@/components/AvatarEdit';
import items from './items';
import { uploadBase64 } from '@/service/qiniu';

const Retro: React.FunctionComponent = () => {
  const { data, loading, error } = useFindUserInfoQuery();
  const formRef = useRef<FormRefInstance>();

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  console.log('data');
  console.log(data);

  const handleSubmit = async (values: unknown) => {
    console.log('values');
    console.log(values);
  };

  const handleClickSubmit = () => {
    formRef.current?.form.handleSubmit(handleSubmit)();
  };

  const updateAvatar = async (base64: string) => {
    const ss = await uploadBase64(base64);
    console.log('ss', ss);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto' }}>
      <Stack spacing={2}>
        <Typography variant="h5">Avatar</Typography>
        <AvatarEdit
          defaultValue={data?.findUserInfo?.avatarUrl as string}
          onChange={updateAvatar}
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
          }}
        />
      </Stack>

      <br />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" size="large" onClick={handleClickSubmit}>
          submit
        </Button>
      </Box>
    </Box>
  );
};

export default Retro;
