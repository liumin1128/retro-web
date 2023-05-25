import UserSelect from '../../components/UserSelect';

export default [
  {
    key: 'user',
    label: 'User',
    placeholder: 'User',
    render: ({ field }) => {
      const { onChange } = field;
      return (
        <UserSelect
          onChange={(e, v) => {
            onChange(v);
          }}
        />
      );
    },
    registerOptions: {
      required: true,
    },
  },
];
