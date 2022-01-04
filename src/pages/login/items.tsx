import * as yup from 'yup';
import Password from '@/components/Form/Fields/Password';

const items = [
  {
    key: 'username',
    label: 'Username',
    required: true,
    schema: yup.string().required(),
  },
  {
    key: 'password',
    label: 'Password',
    required: true,
    type: 'password',
    component: Password,
    schema: yup.string().required(),
  },
];

export default items;
