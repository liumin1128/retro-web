import UserSelect from '../../components/UserSelect';
import RoleSelect from '../../components/RoleSelect';

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

  {
    key: 'roles',
    label: 'Roles',
    placeholder: 'Roles',
    render: ({ field }) => {
      const { onChange } = field;
      return (
        <RoleSelect
          value={field.value || []}
          onChange={(e, v) => {
            onChange(e);
          }}
        />
      );
    },
    registerOptions: {
      required: true,
    },
  },
];
