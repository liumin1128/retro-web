import { FieldValues, UseFormReturn } from 'react-hook-form';
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
  {
    key: 'confirmPassword',
    label: 'Confirm Password',
    required: true,
    type: 'password',
    component: Password,
    registerFunction: (form: UseFormReturn<FieldValues, object>) => {
      return {
        validate: {
          passwordConfirmation: (value: string | boolean) => {
            if (!value) {
              return false;
            }
            const { password } = form.getValues();
            return password === value || 'Passwords should match!';
          },
        },
      };
    },
  },
];

export default items;
