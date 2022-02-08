import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { useReplyCommentMutation, Comment, Reply } from '@/generated/graphql';

interface ICommentReplyProps {
  to: Comment | Reply;
}

export default function CommentReplyContainer(props: ICommentReplyProps) {
  const { to } = props;

  const inputRef = useRef<HTMLTextAreaElement>();

  const [replyComment, { loading }] = useReplyCommentMutation();

  const handleSubmit = () => {
    if (loading) return;
    if (!inputRef.current) return;
    replyComment({
      variables: {
        to: to._id,
        content: inputRef.current.value,
      },
    });
  };

  return (
    <div>
      <Stack spacing={1}>
        <InputBase
          autoFocus
          multiline
          placeholder={`回复 @${to.user?.nickname}:`}
          inputRef={inputRef}
          sx={{
            p: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
          }}
        />
      </Stack>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Stack />
        <Button onClick={handleSubmit} disabled={loading}>
          submit
        </Button>
      </Stack>
    </div>
  );
}
