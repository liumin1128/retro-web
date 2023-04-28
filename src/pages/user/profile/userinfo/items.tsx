import dayjs from 'dayjs';
import Radio from '@/components/Form/Fields/Radio';

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
    key: 'username',
    label: 'Username',
    placeholder: 'Username',
    registerOptions: {
      required: true,
      disabled: true,
    },
  },

  {
    key: 'nickname',
    label: 'Nickname',
    placeholder: 'Nickname',
    registerOptions: {
      required: true,
    },
  },

  {
    key: 'company',
    label: 'Company',
    placeholder: 'Company',
    gridProps: {
      xs: 6,
    },
  },

  {
    key: 'position',
    label: 'Position',
    placeholder: 'Position',
    gridProps: {
      xs: 6,
    },
  },

  {
    key: 'birthday',
    label: 'Birthday',
    placeholder: 'Birthday',
    type: 'date',
    // format: 'YYYY-MM-DD',
    // defaultValue: dayjs().format('YYYY-MM-DD'),
    InputLabelProps: {
      shrink: true,
    },
  },

  {
    key: 'sex',
    name: 'sex',
    label: 'sex',
    placeholder: 'sex',
    component: Radio,
    row: true,
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 },
      { label: '保密', value: 0 },
    ],
  },
  {
    key: 'sign',
    label: 'Sign',
    placeholder: 'Sign',
    multiline: true,
    rows: 4,
  },
];

export default items;
