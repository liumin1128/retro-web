import React from 'react';
import Stack from '@mui/material/Stack';
import { useFindCommentsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';

interface ICommentListProps {
  object: string;
}

const CommentList: React.FunctionComponent<ICommentListProps> = (props) => {
  const { object } = props;
  const { data, loading, error } = useFindCommentsQuery({
    variables: { object },
  });

  if (loading) return <Skeleton />;
  if (error) return <Error />;
  if (!data?.findComments) return <Error />;

  return (
    <Stack>
      {data?.findComments.map((i) => {
        return <div key={i?._id}>{i?.content}</div>;
      })}
    </Stack>
  );
};

export default CommentList;
