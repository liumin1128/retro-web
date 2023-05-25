import get from 'lodash/get';
import UserSelect from '../../components/UserSelect';
import RoleSelect from '../../components/RoleSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import FormHelperText from '@mui/material/FormHelperText';

export default [
  // {
  //   key: 'content',
  //   label: 'Content',
  //   registerOptions: {
  //     required: { value: true, message: 'Content is required' },
  //   },
  //   componentProps: {
  //     fullWidth: true,
  //     label: 'Content',
  //   },
  // },

  {
    key: 'user',
    label: 'User',
    placeholder: 'User',
    registerOptions: {
      required: { value: true, message: 'User is required' },
    },
    render: (props) => {
      const { field, formState } = props;
      const { onChange, value, name } = field;
      const { errors } = formState;

      const error = !!get(errors, name, '');
      const helperText = get(errors, `${name}.message`, '');

      return (
        <FormControl fullWidth>
          <UserSelect
            onChange={(e, v) => {
              onChange(v);
            }}
          />
          {error && <FormHelperText error>{helperText}</FormHelperText>}
        </FormControl>
      );
    },
  },

  {
    key: 'roles',
    label: 'Roles',
    placeholder: 'Roles',
    registerOptions: {
      required: { value: true, message: 'Role is required' },
    },
    render: (props) => {
      return <RoleSelect {...props} />;
    },
  },
];
