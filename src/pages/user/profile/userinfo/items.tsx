import dayjs from 'dayjs';
import Avatar from '@/components/Form/Fields/Avatar';
// import AvatarEdit from '@/components/Form/Fields/AvatarEdit';

const items = [
  // {
  //   key: 'avatarUrl',
  //   label: 'Avatar',
  //   component: Avatar,
  //   registerOptions: {
  //     required: true,
  //   },
  //   errorMessage: 'Please upload avatar',
  // },
  {
    key: 'nickname',
    label: 'nickname',
    placeholder: 'nickname',
    registerOptions: {
      required: true,
    },
  },
  {
    key: 'birthday',
    label: 'birthday',
    placeholder: 'birthday',
  },
  {
    key: 'sex',
    label: 'sex',
    placeholder: 'sex',
  },
  {
    key: 'sign',
    label: 'sign',
    placeholder: 'sign',
    multiline: true,
    rows: 4,
  },
];

export default items;
