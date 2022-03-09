import { history } from 'umi';
import get from 'lodash/get';
import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Retro } from '@/generated/graphql';

const CountList = [
  { key: 'likeCount', icon: <FavoriteIcon sx={{ fontSize: 20 }} /> },
  {
    key: 'happyCount',
    icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 20 }} />,
  },
  { key: 'unhappyCount', icon: <SentimentNeutralIcon sx={{ fontSize: 20 }} /> },
  {
    key: 'wonderringCount',
    icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 20 }} />,
  },
  { key: 'todoCount', icon: <FormatListNumberedIcon sx={{ fontSize: 20 }} /> },
];

interface IAppProps {
  data?: Retro[];
}

const App: React.FunctionComponent<IAppProps> = ({ data }) => {
  const handleClick = (_id: string) => {
    history.push(`/retro/${_id}`);
  };
  return (
    <Grid container spacing={2}>
      {data?.map((i) => {
        return (
          <Grid item xs={12} sm={12} md={6} lg={4} key={i._id}>
            <Card
              sx={{ p: 2, width: '100%', cursor: 'pointer' }}
              onClick={() => handleClick(i._id)}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt={i?.user?.nickname as string}
                  src={i?.user?.avatarUrl as string}
                  sx={{ width: 48, height: 48 }}
                />
                <Stack sx={{ width: '100%' }} spacing={1}>
                  <Stack sx={{ width: '100%', minHeight: '100px' }} spacing={1}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {i?.user?.nickname as string}
                    </Typography>
                    <Typography variant="h6">
                      {i.date} {i.title}
                    </Typography>
                    <Typography variant="body1">{i.content}</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {CountList.map((c) => {
                      return (
                        <Stack
                          direction="row"
                          key={c.key}
                          spacing={0.5}
                          sx={{
                            alignItems: 'center',
                            color: (theme) => theme.palette.grey[500],
                            fontSize: 14,
                          }}
                        >
                          {c.icon}
                          <Typography>{get(i, [`${c.key}`]) || 0}</Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default App;
