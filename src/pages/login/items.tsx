import Password from '@/components/Form/Fields/Password';

const items = [
  {
    key: 'username',
    label: 'Username',
    registerOptions: {
      required: true,
    },
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    component: Password,
    registerOptions: {
      required: true,
    },
  },
];

export default items;
