import { history } from 'umi';
import React from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { Retro, RetroMessageType } from '@/generated/graphql';

const iconList = {
  [RetroMessageType.Happy]: <SentimentSatisfiedAltIcon sx={{ fontSize: 20 }} />,
  [RetroMessageType.Wonderring]: <SentimentNeutralIcon sx={{ fontSize: 20 }} />,
  [RetroMessageType.Unhappy]: (
    <SentimentVeryDissatisfiedIcon sx={{ fontSize: 20 }} />
  ),
  [RetroMessageType.Todo]: <FormatListNumberedIcon sx={{ fontSize: 20 }} />,
};

const countList = [
  RetroMessageType.Happy,
  RetroMessageType.Wonderring,
  RetroMessageType.Unhappy,
  RetroMessageType.Todo,
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
              sx={{ p: 2, minHeight: 156, width: '100%', cursor: 'pointer' }}
              onClick={() => handleClick(i._id)}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt={i?.user?.nickname as string}
                  src={i?.user?.avatarUrl as string}
                  sx={{ width: 48, height: 48 }}
                />
                <Stack sx={{ width: '100%' }} spacing={1}>
                  <Typography
                    variant="caption"
                    color="inherit"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {i?.user?.nickname as string}
                  </Typography>
                  <Typography variant="h6" color="inherit">
                    {i.date} {i.title}
                  </Typography>
                  <Typography variant="body1" color="inherit">
                    {i.content}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      // justifyContent: 'space-between',
                    }}
                  >
                    {countList.map((c) => {
                      return (
                        <Stack
                          direction="row"
                          key={c}
                          spacing={0.5}
                          sx={{
                            alignItems: 'center',
                            color: (theme) => theme.palette.grey[500],
                            fontSize: 14,
                          }}
                        >
                          {iconList[c]}
                          <Typography>
                            {(i?.count && i?.count[c]) || 0}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              </Stack>
            </Card>

            {/* {index !== 0 && <Divider variant="inset" component="li" />}
            <ListItemButton
              onClick={() => {
                handleClick(i._id);
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={i?.user?.nickname as string}
                    src={i?.user?.avatarUrl as string}
                  />
                </ListItemAvatar>
                <ListItemText
                  color="inherit"
                  primary={`${i.date} ${i.title}`}
                  secondary={i.content}
                />
              </ListItem>
            </ListItemButton> */}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default App;
