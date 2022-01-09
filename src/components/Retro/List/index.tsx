import { history } from 'umi';
import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Retro } from '@/generated/graphql';

interface IAppProps {
  data?: Retro[];
}

const App: React.FunctionComponent<IAppProps> = ({ data }) => {
  const handleClick = (_id: string) => {
    history.push(`/retro/${_id}`);
  };
  return (
    <List>
      {data?.map((i, index) => {
        return (
          <Fragment key={i._id}>
            {index !== 0 && <Divider variant="inset" component="li" />}
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
            </ListItemButton>
          </Fragment>
        );
      })}
    </List>
  );
};

export default App;
