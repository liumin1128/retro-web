import { Fragment } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { Dynamic } from '@/generated/graphql';
import UserInfo from './components/UserInfo';

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
                  createdAt={i.createdAt}
                  avatarUrl={i.user?.avatarUrl}
                  nickname={i.user?.nickname || i.user?.username}
                />
                <Typography variant="body1">{i.content}</Typography>
                <Box sx={{ overflow: 'hidden' }}>
                  <Grid container spacing={1}>
                    {i.pictures?.map((img) => {
                      return (
                        <Grid key={img} item xs={4}>
                          <CardMedia
                            image={img}
                            sx={{
                              width: '100%',
                              height: '100%',
                              paddingTop: '100%',
                              borderRadius: '4px',
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Stack>
            </Paper>
            <Divider />
          </Fragment>
        );
      })}
    </Box>
  );
}
