import * as React from 'react';
import { useLocation, history } from 'umi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useFindUserInfoQuery } from '@/generated/graphql';

const TABS = [
  { title: 'Schedule', pathname: '/seatselection/schedule' },
  // { title: 'Seat Table', pathname: '/seatselection/table' },
  // { title: 'Setting', pathname: '/seatselection/setting' },
];

export default function ScrollableTabsButtonAuto() {
  const location = useLocation();

  const { data } = useFindUserInfoQuery();

  const hasAuth =
    data?.findUserInfo?.tags?.findIndex((i) => i === 'SeatSelectionAdmin') !==
    -1;

  let list = TABS;

  if (hasAuth) {
    list = [
      { title: 'Schedule', pathname: '/seatselection/schedule' },
      // { title: 'Seat Table', pathname: '/seatselection/table' },
      { title: 'Setting', pathname: '/seatselection/setting' },
    ];
  }

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
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
