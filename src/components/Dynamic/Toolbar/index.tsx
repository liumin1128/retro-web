import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LikeAnimation from '@/components/LikeAnimation';

interface IToolbarProps {
  likeCount: number;
  likeStatus: boolean;
  commentCount: number;
  shareCount: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const Toolbar: React.FunctionComponent<IToolbarProps> = (props) => {
  const {
    likeCount,
    likeStatus,
    commentCount,
    shareCount,
    onLike,
    onComment,
    onShare,
  } = props;
  return (
    <Stack
      direction="row"
      spacing={8}
      sx={{
        alignItems: 'center',
      }}
    >
      <Stack
        onClick={onLike}
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', cursor: 'pointer', minWidth: 48 }}
      >
        <LikeAnimation
          sx={{ fontSize: '1.25em' }}
          status={likeStatus as boolean}
        />
        <Typography variant="body2">
          {likeCount === 0 ? null : likeCount}
        </Typography>
      </Stack>

      <Stack
        onClick={onComment}
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', cursor: 'pointer', minWidth: 48 }}
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: '1.25em' }} />
        <Typography variant="body2">
          {commentCount === 0 ? null : commentCount}
        </Typography>
      </Stack>

      <Stack
        onClick={onShare}
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          minWidth: 48,
        }}
      >
        <ShareOutlinedIcon sx={{ fontSize: '1.25em' }} />
        <Typography variant="body2">
          {shareCount === 0 ? null : shareCount}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Toolbar;
