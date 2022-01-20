import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useCreateDynamicMutation } from '@/generated/graphql';
import { uploadItem } from '@/service/qiniu';
import Form, { FormRefInstance } from '@/components/Form';
import items from './items';

export default function DynamicListContainer() {
  const input = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<FormRefInstance>();

  const [createDynamic, { data, loading, error }] = useCreateDynamicMutation();

  console.log('data, loading, error');
  console.log(data, loading, error);

  if (loading) return 'loading';
  if (error) return 'error';

  const handleSubmit = async (values: unknown) => {
    console.log('values');
    console.log(values);
    if (values.pictures) {
      // eslint-disable-next-line no-param-reassign
      values.pictures = await uploadItem(values.pictures);
    }
    console.log('values');
    console.log(values);
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
    <div>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Form
            ref={formRef}
            items={items}
            defaultValues={{
              content: 'xxxx',
              pictures: [
                'https://imgs.react.mobi/FiuNn6JvGldeUKBLOi_MfxS7XrVT',
              ],
            }}
          />
        </Stack>

        <Button
          onClick={() => {
            handleClick();
          }}
        >
          createDynamic
        </Button>
      </Paper>

      <input ref={input} />
      <Button
        onClick={() => {
          handleClick();
        }}
      >
        createDynamic
      </Button>
    </div>
  );
}
