import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Dynamic } from '@/generated/graphql';
import UserInfo from './components/UserInfo';
import Pictures from './components/Pictures';

interface Props {
  data?: Dynamic[];
}

export default function DynamicList({ data }: Props) {
  console.log('data');
  console.log(data);
  return (
    <Box>
      {data?.map((i) => {
        return (
          <Fragment key={i._id}>
            <Paper sx={{ px: 2, py: 4, borderRadius: 0 }}>
              <Stack spacing={2}>
                <UserInfo
                  createdAt={i.createdAt as string}
                  avatarUrl={i.user?.avatarUrl as string}
                  nickname={i.user?.nickname as string}
                />
                <Typography variant="body1">{i.content}</Typography>

                <Pictures pictures={i.pictures as string[]} />
              </Stack>
            </Paper>
            <Divider />
          </Fragment>
        );
      })}
    </Box>
  );
}
