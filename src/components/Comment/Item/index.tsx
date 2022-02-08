import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentIcon from '@mui/icons-material/CommentOutlined';
import { Comment } from '@/generated/graphql';
import { getTimeAgo } from '@/utils/format';

interface ICommentItemProps {
  comment: Comment;
  onZan?: () => void;
  onReply?: () => void;
}

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
  const { comment, onZan, onReply } = props;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        src={comment?.user?.avatarUrl as string}
        sx={{ width: 48, height: 48 }}
      />
      <Stack spacing={1}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {comment.user?.nickname as string}
        </Typography>
        <Typography variant="body1">{comment.content as string}</Typography>

        <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
          <Typography variant="caption" sx={{ minWidth: 64 }}>
            {getTimeAgo(parseInt(comment.createdAt as string, 10))}
          </Typography>

          <Stack
            onClick={onZan}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center' }}
          >
            <FavoriteIcon sx={{ fontSize: 'inherit' }} />
            <Typography variant="caption">1</Typography>
          </Stack>

          <Stack
            onClick={onReply}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center' }}
          >
            <CommentIcon sx={{ fontSize: 'inherit' }} />
            <Typography variant="caption">1</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CommentItem;
