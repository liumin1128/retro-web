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
    key: 'nickname',
    label: 'Nickname',
    placeholder: 'Nickname',
    registerOptions: {
      required: true,
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
