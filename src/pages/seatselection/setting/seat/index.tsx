import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  SeatFieldsFragment,
  useFindSeatsQuery,
  useUpdateSeatMutation,
} from '@/generated/graphql';
import Table from '@/components/Table';
import Modal, { ModalMethods } from '@/components/ModalRefV2';
import Form, { FormRefInstance } from '@/components/Form/v2';
import getColumns from './columns';
import items from './items';

const Retro: React.FunctionComponent = () => {
  const { data, loading, error, refetch } = useFindSeatsQuery();
  const [update] = useUpdateSeatMutation();

  const modalRef = React.useRef<ModalMethods>(null);
  const formRef = React.useRef<FormRefInstance>(null);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  const handleSubmitTags =
    (id: string) => async (values: Record<string, unknown>) => {
      await update({ variables: { id, tags: values.tags as string[] } });
      await refetch();
    };

  const handleSwitchDisabled = async (id: string, disabled: boolean) => {
    await update({ variables: { id, disabled } });
    await refetch();
  };

  const columns = getColumns({
    onSwitchDisabled: handleSwitchDisabled,
    onEditTags: (row: SeatFieldsFragment) => {
      modalRef.current?.open({
        title: 'Edit Tags',
        onConfirm: async () => {
          await formRef.current?.submit();
        },
        render: () => (
          <Stack spacing={1} sx={{ py: 2 }}>
            <Form
              items={items}
              ref={formRef}
              defaultValues={{
                tags: row?.tags,
              }}
              onSubmit={handleSubmitTags(row?._id)}
            />
          </Stack>
        ),
      });
    },
  });

  return (
    <Box>
      <Container>
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h1">Setting Seat Permissions</Typography>
            <br />
            <Typography variant="body1">Setting Seat Permissions </Typography>
            <br />
          </Stack>

          <Stack sx={{ maxWidth: 800 }}>
            <Table columns={columns} data={data?.findSeats || []} />
          </Stack>
        </Stack>
      </Container>
      <Modal ref={modalRef} fullWidth />
    </Box>
  );
};

export default Retro;
