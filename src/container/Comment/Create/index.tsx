import { history } from 'umi';
import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import InputBase from '@mui/material/InputBase';
import {
  useCreateCommentMutation,
  CommentObjectUnionModel,
  CommentFieldsFragmentDoc,
} from '@/generated/graphql';
import UserAvatar from '@/container/UserInfo/Avatar';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';
import useKeyPress from '@/hooks/useKeyPress';

interface ICommentCreateProps {
  object: string;
}

export default function CommentCreateContainer(props: ICommentCreateProps) {
  const { object } = props;

  const inputRef = useRef<HTMLTextAreaElement>();

  const [createComment, { loading }] = useCreateCommentMutation();

  const handleSubmit = async () => {
    if (loading) return;
    if (!inputRef.current) return;
    if (!inputRef.current.value) return;
    await createComment({
      variables: {
        object,
        objectModel: CommentObjectUnionModel.Dynamic,
        content: inputRef.current.value,
      },
      update(cache, { data }) {
        cache.modify({
          fields: {
            findComments(list = []) {
              const item = cache.writeFragment({
                data: data?.createComment,
                fragment: CommentFieldsFragmentDoc,
              });
              return [item, ...list];
            },
          },
        });
      },
    });
    inputRef.current.value = '';
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
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <UserAvatar sx={{ width: 48, height: 48 }} />
      <Stack spacing={1} sx={{ flex: 1 }}>
        <InputBase
          multiline
          placeholder="发一条友善的评论"
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
    </Stack>
  );
}
