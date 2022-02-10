import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Comment } from '@/generated/graphql';
import CommentItem from '@/components/Comment/Item';
import CommentReply from '@/container/Comment/Create/Reply';

interface ICommentItemContainerProps {
  comment: Comment;
}

const CommentItemContainer: React.FunctionComponent<
  ICommentItemContainerProps
> = (props) => {
  const { comment } = props;

  const [replyVisible, setReplyVisible] = useState<boolean>(false);

  return (
    <Stack spacing={2}>
      <CommentItem
        comment={comment}
        // onZan={() => {}}
        onReply={() => {
          setReplyVisible(!replyVisible);
        }}
      />
      {replyVisible && (
        <CommentReply
          to={comment}
          onCompleted={() => {
            setReplyVisible(false);
          }}
        />
      )}
    </Stack>
  );
};

export default CommentItemContainer;
