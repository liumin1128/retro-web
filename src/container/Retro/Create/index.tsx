import * as React from 'react';
import { useMutation } from '@apollo/client';
import { CreateRetro, RetroResult, RetroFragment } from '@/graphql/retro';
import Create from '@/components/Retro/CreateRetro';

const Retro: React.FunctionComponent = () => {
  const [createRetro] = useMutation<RetroResult>(CreateRetro);

  const handleClick = (values) => {
    createRetro({
      variables: values,
      update(cache, { data }) {
        cache.modify({
          fields: {
            retros(existingItems = []) {
              const newTodoRef = cache.writeFragment({
                data: data.createRetro,
                fragment: RetroFragment,
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
