import React from 'react';
import Stack from '@mui/material/Stack';
import { Comment } from '@/generated/graphql';
import CommentItem from '@/components/Comment/Item';

interface ICommentItemContainerProps {
  comment: Comment;
}

const CommentItemContainer: React.FunctionComponent<
  ICommentItemContainerProps
> = (props) => {
  const { comment } = props;

  console.log(comment);

  return (
    <Stack>
      <CommentItem comment={comment} />
    </Stack>
  );
};

export default CommentItemContainer;
