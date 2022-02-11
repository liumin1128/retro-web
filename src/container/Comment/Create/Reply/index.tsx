import { history } from 'umi';
import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import {
  useReplyCommentMutation,
  CommentFieldsFragment,
  ReplyFieldsFragment,
  CommentFieldsFragmentDoc,
} from '@/generated/graphql';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';
import useKeyPress from '@/hooks/useKeyPress';

interface ICommentReplyProps {
  to: CommentFieldsFragment | ReplyFieldsFragment;
  onCompleted?: () => void;
}

export default function CommentReplyContainer(props: ICommentReplyProps) {
  const { to, onCompleted } = props;

  const inputRef = useRef<HTMLTextAreaElement>();

  const [replyComment, { loading }] = useReplyCommentMutation();

  const handleSubmit = async () => {
    if (loading) return;
    if (!inputRef.current) return;

    await replyComment({
      variables: {
        to: to._id,
        content: inputRef.current.value,
      },
      update(cache, { data }) {
        cache.updateFragment(
          {
            id: `Comment:${data?.replyComment?.commentTo?._id}`,
            fragment: CommentFieldsFragmentDoc,
          },
          (item) => {
            const newComments = [data?.replyComment, ...(item.comments || [])];
            return { ...item, comments: newComments };
          },
        );
      },
    });
    inputRef.current.value = '';
    if (onCompleted) onCompleted();
  };

  useKeyPress(['meta 13', 'ctrl 13'], handleSubmit, {
    target: inputRef.current,
  });

  const handleFocus = () => {
    const token = getStorage(USER_TOKEN);
    if (!token) {
      history.push('/login');
    }
  };

  return (
    <Stack spacing={1} sx={{ pl: 8 }}>
      <InputBase
        autoFocus
        multiline
        placeholder={`回复 @${to.user?.nickname}:`}
        inputRef={inputRef}
        onFocus={handleFocus}
        sx={{
          px: 2,
          py: 1.5,
          minHeight: 48,
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
          flex: 1,
        }}
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <IconButton disabled>
          <InsertPhotoIcon />
        </IconButton>
        <IconButton disabled>
          <InsertEmoticonIcon />
        </IconButton>
        <Stack sx={{ flex: 1 }} />
        <Typography variant="caption" sx={{ color: '#999' }}>
          ⌘ + Enter
        </Typography>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Send
        </Button>
      </Stack>
    </Stack>
  );
}
