// 修复这个文件的类型错误

import * as React from 'react';
import Create from '@/components/Retro/CreateRetro';
import {
  useCreateRetroMutation,
  FindRetrosDocument,
} from '@/generated/graphql';

const Retro: React.FunctionComponent = () => {
  const [createRetro] = useCreateRetroMutation();

  const handleClick = (values) => {
    // eslint-disable-next-line
    values.anonymous = values.anonymous === 'true';
    createRetro({
      variables: values,
      refetchQueries: [FindRetrosDocument],
    });
  };

  return <Create onSubmit={handleClick} />;
};

export default Retro;
