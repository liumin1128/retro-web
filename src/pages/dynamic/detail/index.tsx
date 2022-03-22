import { useParams } from 'umi';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DynamicDetail from '@/container/Dynamic/Detail';
import CommentList from '@/container/Comment/List';
import CommentCreate from '@/container/Comment/Create';

export default function Home() {
  const params = useParams<{ id: string }>();
  return (
    <Stack spacing={4}>
      <DynamicDetail id={params.id} />

      <Stack spacing={4}>
        <Typography variant="h5">发表评论</Typography>
        <CommentCreate object={params.id} />
      </Stack>

      <Stack spacing={4}>
        <Typography variant="h5">评论列表</Typography>
        <CommentList object={params.id} />
      </Stack>
    </Stack>
  );
}
