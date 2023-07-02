import { history } from 'umi';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useNavList from '../useNavList';

export default function ScrollableTabsButtonAuto({ onClick }) {
  const { list } = useNavList();

  return (
    <List>
      {list.map((nav) => {
        return (
          <ListItem key={nav.pathname} sx={{ height: '64px' }}>
            <ListItemText
              primary={nav.title}
              onClick={() => {
                history.push(nav.pathname);
                onClick();
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
