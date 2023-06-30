import { useLocation, history } from 'umi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useNavList from './useNavList';

export default function ScrollableTabsButtonAuto() {
  const location = useLocation();
  const { list } = useNavList();

  return (
    <Tabs
      textColor="inherit"
      sx={{ height: '64px' }}
      value={list.findIndex((i) => location.pathname.includes(i.pathname))}
      onChange={(_, idx) => {
        history.push(list[idx].pathname);
      }}
    >
      {list.map((nav) => {
        return (
          <Tab key={nav.pathname} label={nav.title} sx={{ height: '64px' }} />
        );
      })}
    </Tabs>
  );
}
