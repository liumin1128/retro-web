import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import { CreateDynamic, DynamicResult } from '@/graphql/dynamic';

export default function DynamicListContainer() {
  const input = useRef<HTMLInputElement | null>(null);

  const [createDynamic, { data, loading, error }] =
    useMutation<DynamicResult>(CreateDynamic);

  console.log('data, loading, error');
  console.log(data, loading, error);

  if (loading) return 'loading';
  if (error) return 'error';

  function handleClick() {
    createDynamic({
      variables: { content: input.current?.value },

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
  }

  return (
    <div>
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
