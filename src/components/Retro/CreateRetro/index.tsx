// import { useSubscription } from '@apollo/client';
// import { RETRO_SUBSCRIPTION } from '@/graphql/retro';
import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ModalRef, { ModalRefInstance } from '@/components/ModalRef/Dialog';
import Form, { FormRefInstance } from '@/components/Form';
import items from './items';

interface Props {
  onSubmit: (values: unknown) => void;
}

export default function Home({ onSubmit }: Props) {
  const modalRef = useRef<ModalRefInstance<unknown>>();
  const formRef = useRef<FormRefInstance>();

  const handleSubmit = (values) => {
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
