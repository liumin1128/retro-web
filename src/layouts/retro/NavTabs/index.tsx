import { useLocation, history } from 'umi';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import useNavList from '../useNavList';

const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 4,
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    height: 4,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primary.main : '#fff',
  },
}));

export default function ScrollableTabsButtonAuto() {
  const location = useLocation();
  const { list } = useNavList();

  return (
    <StyledTabs
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
    </StyledTabs>
  );
}
