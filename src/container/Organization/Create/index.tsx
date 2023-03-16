import { useRef } from 'react';
import { FieldValues } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { useCreateOrganizationMutation } from '@/generated/graphql';
// import { uploadItem } from '@/service/qiniu';
import Form, { FormRefInstance } from '@/components/Form';
import items from './items';

export default function DynamicListContainer() {
  const formRef = useRef<FormRefInstance>();
  // const [createDynamic, { loading }] = useCreateOrganizationMutation();

  const handleSubmit = async (values: FieldValues) => {
    // let logo = '';

    try {
      if (values.logo) {
        // [logo] = await uploadItem(values.logo);
      }

      // await createDynamic({
      //   variables: {
      //     name: values.name,
      //     description: values.description,
      //     logo,
      //   },
      // });
    } catch (err) {
      console.log(err);
    }

    formRef.current?.form.reset();
  };

  function handleClick() {
    formRef.current?.form.handleSubmit(handleSubmit)();
  }

  return (
    <Stack spacing={1}>
      <Form ref={formRef} items={items} />
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            handleClick();
          }}
          // disabled={loading}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
