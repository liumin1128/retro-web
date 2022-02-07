// import { useRef } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
  useCreateCommentMutation,
  CommentObjectUnionModel,
} from '@/generated/graphql';

interface ICommentCreateProps {
  object: string;
}

export default function CommentCreateContainer(props: ICommentCreateProps) {
  const { object } = props;

  const [createComment, { loading, error }] = useCreateCommentMutation();
  if (loading) return 'loading';
  if (error) return 'error';

  const handleSubmit = () => {
    createComment({
      variables: {
        object,
        objectModel: CommentObjectUnionModel.Dynamic,
        content: 'xxxxxx',
      },
    });
  };

  return (
    <div>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={1}>11111</Stack>
        <Button onClick={handleSubmit}>submit</Button>
      </Paper>
    </div>
  );
}
