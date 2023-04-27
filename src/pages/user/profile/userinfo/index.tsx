import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFindUserInfoQuery } from '@/generated/graphql';
import Form, { FormRefInstance } from '@/components/Form';
import items from './items';

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

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Form
        items={items}
        ref={formRef}
        defaultValues={{
          nickname: data?.findUserInfo?.nickname,
          avatarUrl: data?.findUserInfo?.avatarUrl,
        }}
        onSubmit={(values) => {
          console.log('onSubmit:', values);
        }}
      />
      <Button onClick={handleClickSubmit}>submit</Button>
    </Box>
  );
};

export default Retro;
