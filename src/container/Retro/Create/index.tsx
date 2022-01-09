import * as React from 'react';
import Create from '@/components/Retro/CreateRetro';
import {
  useCreateRetroMessageMutation,
  RetroFieldsFragmentDoc,
} from '@/generated/graphql';

const Retro: React.FunctionComponent = () => {
  const [createRetro] = useCreateRetroMessageMutation();

  const handleClick = (values) => {
    createRetro({
      variables: values,
      update(cache, { data }) {
        cache.modify({
          fields: {
            retros(existingItems = []) {
              const newTodoRef = cache.writeFragment({
                data: data.createRetro,
                fragment: RetroFieldsFragmentDoc,
              });
              return [...existingItems, newTodoRef];
            },
          },
        });
      },
    });
  };

  return <Create onSubmit={handleClick} />;
};

export default Retro;
