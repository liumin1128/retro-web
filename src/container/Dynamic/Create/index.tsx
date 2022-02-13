import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useCreateDynamicMutation } from '@/generated/graphql';
import { uploadItem } from '@/service/qiniu';
import Form, { FormRefInstance } from '@/components/Form';
import items from './items';

export default function DynamicListContainer() {
  const formRef = useRef<FormRefInstance>();
  const [createDynamic, { loading, error }] = useCreateDynamicMutation();
  if (loading) return 'loading';
  if (error) return 'error';

  const handleSubmit = async (values: unknown) => {
    if (values.pictures) {
      // eslint-disable-next-line no-param-reassign
      values.pictures = await uploadItem(values.pictures);
    }

    // formRef.current?.form.reset();

    createDynamic({
      variables: {
        content: values.content as string,
        pictures: values.pictures as string[],
      },

      update(cache, { data: newData }) {
        cache.modify({
          fields: {
            todos(existingItems = []) {
              console.log('existingItems');
              console.log(existingItems);
              console.log('newData');
              console.log(newData);
              //   const newTodoRef = cache.writeFragment({
              //     data: addTodo,
              //     fragment: gql`
              //       fragment NewTodo on Todo {
              //         id
              //         type
              //       }
              //     `,
              //   });
              //   return [...existingTodos, newTodoRef];
            },
          },
        });
      },
    });
  };

  function handleClick() {
    formRef.current?.form.handleSubmit(handleSubmit)();
  }

  return (
    <Stack spacing={1}>
      <Form
        ref={formRef}
        items={items}
        // defaultValues={
        //   {
        //     // content: 'xxxx',
        //     // pictures: ['https://imgs.react.mobi/FiuNn6JvGldeUKBLOi_MfxS7XrVT'],
        //   }
        // }
      />
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            handleClick();
          }}
          disabled={loading}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
