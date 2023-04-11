import dayjs from 'dayjs';

const items = [
  {
    key: 'title',
    label: 'title',
    placeholder: 'title',
    registerOptions: {
      required: true,
    },
    defaultValue: `Retro ${dayjs().format('YYYY-MM-DD')}`,
  },
  {
    key: 'date',
    label: 'date',
    placeholder: 'date',
    type: 'date',
    defaultValue: dayjs().format('YYYY-MM-DD'),
    registerOptions: {
      required: true,
    },
    InputLabelProps: {
      shrink: true,
    },
  },
  {
    key: 'content',
    label: 'content',
    placeholder: 'content',
    rows: 4,
    multiline: true,
  },
  // {
  //   key: 'anonymous',
  //   label: 'userInfo',
  //   placeholder: 'userInfo',
  //   render: (props) => {
  //     return (
  //       <Select
  //         {...props}
  //         options={[
  //           { value: false, label: 'visible' },
  //           { value: true, label: 'hide' },
  //         ]}
  //       />
  //     );
  //   },
  // },
];

export default items;
