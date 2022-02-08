import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { Reply } from '@/generated/graphql';
import CommentItem from '@/components/Comment/ReplyItem';
import CommentReply from '@/container/Comment/Create/Reply';

interface ICommentItemContainerProps {
  comment: Reply;
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
      {replyVisible && <CommentReply to={comment} />}
    </Stack>
  );
};

export default CommentItemContainer;
