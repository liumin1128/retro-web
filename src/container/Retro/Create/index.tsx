import * as React from 'react';
import Create from '@/components/Retro/CreateRetro';
import {
  useCreateRetroMutation,
  RetroFieldsFragmentDoc,
} from '@/generated/graphql';

const Retro: React.FunctionComponent = () => {
  const [createRetro] = useCreateRetroMutation();

  const handleClick = (values) => {
    // eslint-disable-next-line
    values.anonymous = values.anonymous === 'true';

    createRetro({
      variables: values,
      update(cache, { data }) {
        cache.modify({
          fields: {
            findRetros(existingItems = []) {
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
