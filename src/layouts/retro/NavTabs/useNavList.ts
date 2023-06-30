import { useFindUserInfoQuery } from '@/generated/graphql';

export default function useNavList() {
  const { data } = useFindUserInfoQuery();

  const hasAuth =
    data?.findUserInfo?.tags?.findIndex((i) => i === 'SeatSelectionAdmin') !==
    -1;

  const hasSeat =
    data?.findUserInfo?.tags?.findIndex((i) => i === 'ComTech') !== -1;

  const list = [
    { title: 'Retro', pathname: '/retro' },
    ...(hasSeat
      ? [{ title: 'Schedule', pathname: '/seatselection/schedule' }]
      : []),
    ...(hasAuth
      ? [{ title: 'Setting', pathname: '/seatselection/setting' }]
      : []),
    { title: 'Profile', pathname: '/user/profile' },
  ];

  return {
    list,
  };
}
