import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import {
  useCreateCommentMutation,
  CommentObjectUnionModel,
  CommentFieldsFragmentDoc,
} from '@/generated/graphql';

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
              return [...list, item];
            },
          },
        });
      },
    });
    inputRef.current.value = '';
  };

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <InputBase
        autoFocus
        multiline
        placeholder="发一条友善的评论"
        inputRef={inputRef}
        sx={{
          p: 2,
          bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
          flex: 1,
        }}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        Send
      </Button>
    </Stack>
  );
}
