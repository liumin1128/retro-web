import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalRef, { ModalRefInstance } from '@/components/ModalRef/Dialog';
import Form, { FormRefInstance } from '@/components/Form';
import { CreateDynamicInput } from '@/generated/graphql';
import items from './items';

interface Props {
  onSubmit: (values: unknown) => void;
}

export default function Home({ onSubmit }: Props) {
  const modalRef = useRef<ModalRefInstance<unknown>>();
  const formRef = useRef<FormRefInstance>();

  const handleSubmit = (values: CreateDynamicInput) => {
    onSubmit(values);
    modalRef.current?.close();
    formRef.current?.form.reset();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          modalRef.current?.open();
        }}
        color="primary"
        size="large"
      >
        Create Retro
      </Button>

      <ModalRef
        title="Create Retro"
        ref={modalRef}
        fullWidth
        render={() => {
          return (
            <Box>
              <Form ref={formRef} items={items} />
            </Box>
          );
        }}
        onOk={() => {
          formRef.current?.form.handleSubmit(handleSubmit)();
        }}
      />
    </div>
  );
}
