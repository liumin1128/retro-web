import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Comment } from '@/generated/graphql';
import { getTimeAgo } from '@/utils/format';

interface ICommentItemProps {
  comment: Comment;
}

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
  const { comment } = props;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        src={comment?.user?.avatarUrl as string}
        sx={{ width: 48, height: 48 }}
      />
      <Stack>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {comment.user?.nickname as string}
        </Typography>
        <Typography variant="body1">{comment.content as string}</Typography>
        <Typography variant="caption">
          {getTimeAgo(parseInt(comment.createdAt as string, 10))}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CommentItem;
