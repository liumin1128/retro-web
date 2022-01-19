import { useRef } from 'react';
import Button from '@mui/material/Button';
import { useCreateDynamicMutation } from '@/generated/graphql';
import UploadPictures from '@/components/Upload/Pictures';
import { upload } from '@/service/qiniu';

export default function DynamicListContainer() {
  const input = useRef<HTMLInputElement | null>(null);

  const [createDynamic, { data, loading, error }] = useCreateDynamicMutation();

  console.log('data, loading, error');
  console.log(data, loading, error);

  if (loading) return 'loading';
  if (error) return 'error';

  function handleClick() {
    createDynamic({
      variables: { content: input.current?.value as string },

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
      <UploadPictures
        onChange={(sss) => {
          console.log('sss');
          console.log(sss);
          upload(sss).then((jjj) => {
            console.log('jjj');
            console.log(jjj);
          });
        }}
      />
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
