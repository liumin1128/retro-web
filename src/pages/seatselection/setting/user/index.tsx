import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  useFindUsersQuery,
  useAdminPushUsersTagsMutation,
  useAdminPullUsersTagsMutation,
} from '@/generated/graphql';
import Table from '@/components/Table';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import Form, { FormRefInstance } from '@/components/Form/v2';
import getColumns from './columns';
import items from './items';

const Retro: React.FunctionComponent = () => {
  const { data, loading, error, refetch } = useFindUsersQuery({
    variables: {
      tags: ['ComTech'],
    },
  });
  const [pushTag] = useAdminPushUsersTagsMutation();
  const [pullTag] = useAdminPullUsersTagsMutation();

  const modalRef = React.useRef<ModalMethods>(null);
  const formRef = React.useRef<FormRefInstance>(null);

  const handleSubmit = async (values: Record<string, unknown>) => {
    await pushTag({
      variables: {
        users: values.users.map((i) => i._id),
        tags: values.tags,
      },
    });
    await refetch();
  };

  const handelAddUser = () => {
    modalRef?.current?.open({
      title: 'Add User',
      onConfirm: async () => {
        await formRef.current?.submit();
      },
      render: () => (
        <Stack spacing={1} sx={{ py: 2 }}>
          <Form items={items} ref={formRef} onSubmit={handleSubmit} />
        </Stack>
      ),
    });
  };

  const handleDeleteTag = async (_id, tag) => {
    await pullTag({
      variables: {
        users: [_id],
        tags: [tag],
      },
    });
    await refetch();
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const columns = getColumns({
    onDeleteTag: (row, tag) => {
      handleDeleteTag(row._id, tag);
    },
  });

  return (
    <Box>
      <Container>
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h1">Setting User Permissions</Typography>
            <br />
            <Typography variant="body1">Setting User Permissions </Typography>
            <br />
          </Stack>
          <Stack direction="row">
            <Button variant="contained" onClick={handelAddUser}>
              Add User
            </Button>
          </Stack>
          <Stack sx={{ maxWidth: 800 }}>
            <Table columns={columns} data={data?.findUsers || []} />
          </Stack>
        </Stack>
      </Container>
      <Modal ref={modalRef} fullWidth />
    </Box>
  );
};

export default Retro;
