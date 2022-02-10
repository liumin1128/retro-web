import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
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

  const handleSubmit = () => {
    if (loading) return;
    if (!inputRef.current) return;
    createComment({
      variables: {
        object,
        objectModel: CommentObjectUnionModel.Dynamic,
        content: inputRef.current.value,
      },
      update(cache, { data }) {
        console.log('data');
        console.log(data);
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
  };

  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>
          <InputBase
            autoFocus
            multiline
            placeholder="发一条友善的评论"
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
      </Paper>
    </div>
  );
}
