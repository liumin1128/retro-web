import React, { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useFindCommentsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';
import CommentItem from '@/container/Comment/Item';
import ReplyItem from '@/container/Comment/ReplyItem';

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
    <Stack spacing={3} divider={<Divider variant="inset" />}>
      {data?.findComments.map((i) => {
        return (
          <Fragment key={i?._id}>
            <CommentItem comment={i} />
            <Stack spacing={3} sx={{}}>
              {Array.isArray(i?.comments) &&
                i?.comments.map((j) => {
                  return (
                    <Fragment key={j?._id}>
                      <ReplyItem comment={j} />
                    </Fragment>
                  );
                })}
            </Stack>
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default CommentList;
