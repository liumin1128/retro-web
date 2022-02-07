import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Dynamic } from '@/generated/graphql';
import UserInfo from '../components/UserInfo';
import Pictures from '../components/Pictures';

interface Props {
  data: Dynamic;
}

export default function DynamicList({ data }: Props) {
  return (
    <Box sx={{ overflow: 'hidden', borderRadius: '10px' }}>
      <Paper sx={{ px: 2, py: 4, borderRadius: 0 }}>
        <Stack spacing={2}>
          <UserInfo
            createdAt={data.createdAt as string}
            avatarUrl={data.user?.avatarUrl as string}
            nickname={data.user?.nickname as string}
          />
          <Typography variant="body1">{data.content}</Typography>
          <Pictures pictures={data.pictures as string[]} />
        </Stack>
      </Paper>
    </Box>
  );
}
