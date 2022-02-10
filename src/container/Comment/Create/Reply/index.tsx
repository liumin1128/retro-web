import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import {
  useReplyCommentMutation,
  Comment,
  Reply,
  CommentFieldsFragmentDoc,
} from '@/generated/graphql';

interface ICommentReplyProps {
  to: Comment | Reply;
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
            const newComments = [...(item.comments || []), data?.replyComment];
            return { ...item, comments: newComments };
          },
        );
      },
    });
    inputRef.current.value = '';
    if (onCompleted) onCompleted();
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
