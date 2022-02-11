import React, { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useFindCommentsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';
import ReplyItem from '@/container/Comment/ReplyItem';
import CommentItem from '@/container/Comment/Item';

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
    <Stack
      spacing={3}
      divider={
        <Stack>
          <Divider sx={{ ml: 8 }} variant="inset" />
        </Stack>
      }
    >
      {data?.findComments.map((i) => {
        if (!i) return null;
        return (
          <Fragment key={i?._id}>
            <CommentItem comment={i} />
            {Array.isArray(i?.comments) &&
              i?.comments &&
              i?.comments.length > 0 && (
                <Stack spacing={3} sx={{}}>
                  {Array.isArray(i?.comments) &&
                    i?.comments.map((j) => {
                      if (!j) return null;
                      return (
                        <Fragment key={j?._id}>
                          <ReplyItem comment={j} />
                        </Fragment>
                      );
                    })}
                </Stack>
              )}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default CommentList;
