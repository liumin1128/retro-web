import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { ReplyFieldsFragment } from '@/generated/graphql';
import { getTimeAgo } from '@/utils/format';
import LikeAnimation from '@/components/LikeAnimation';

interface ICommentItemProps {
  comment: ReplyFieldsFragment;
  onZan?: () => void;
  onReply?: () => void;
}

const CommentItem: React.FunctionComponent<ICommentItemProps> = (props) => {
  const { comment, onZan, onReply } = props;

  return (
    <Stack spacing={2} direction="row">
      <Stack sx={{ width: 48, alignItems: 'flex-end' }}>
        <Avatar
          src={comment?.user?.avatarUrl as string}
          sx={{ width: 32, height: 32 }}
        />
      </Stack>

      <Stack
        spacing={2}
        sx={{
          flex: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          spacing={1}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {comment.user?.nickname as string}
          </Typography>

          <Typography variant="body2">回复</Typography>

          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {comment.replyTo?.user?.nickname as string}
          </Typography>
        </Stack>

        <Typography variant="body1">{comment.content as string}</Typography>

        <Stack
          direction="row"
          spacing={4}
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" sx={{ minWidth: 64 }}>
            {getTimeAgo(parseInt(comment.createdAt as string, 10))}
          </Typography>

          <Stack
            onClick={onZan}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', minWidth: 48, cursor: 'pointer' }}
          >
            <LikeAnimation
              sx={{ fontSize: 'inherit' }}
              status={comment.likeStatus as boolean}
            />
            <Typography variant="caption">{comment.likeCount}</Typography>
          </Stack>

          <Stack
            onClick={onReply}
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', cursor: 'pointer' }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 'inherit' }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CommentItem;
