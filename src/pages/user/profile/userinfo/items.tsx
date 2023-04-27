import dayjs from 'dayjs';
import Avatar from '@/components/Form/Fields/Avatar';
// import AvatarEdit from '@/components/Form/Fields/AvatarEdit';

const items = [
  {
    key: 'avatarUrl',
    label: 'Avatar',
    component: Avatar,
    registerOptions: {
      required: true,
    },
    errorMessage: 'Please upload avatar',
  },
  {
    key: 'nickname',
    label: 'nickname',
    placeholder: 'nickname',
    registerOptions: {
      required: true,
    },
  },
  {
    key: 'bio',
    label: 'bio',
    placeholder: 'bio',
  },
];

export default items;
