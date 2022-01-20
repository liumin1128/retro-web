import {
  ElementType,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react';
import get from 'lodash/get';
import * as yup from 'yup';
import {
  useForm,
  UseFormReturn,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
// import { yupResolver } from '@hookform/resolvers/yup';

export interface FormRefInstance {
  form: UseFormReturn;
}

interface Values {
  [key: string]: string;
}

interface Item {
  key: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  schema?: yup.AnySchema<unknown>;
  component?: ElementType;
  render?: (props?: Record<string, unknown>) => ReactNode;
  registerOptions?: RegisterOptions;
  registerFunction?: (
    form: UseFormReturn<FieldValues, object>,
  ) => RegisterOptions;
}

interface IFormProps {
  onSubmit?: (values: Values) => void;
  defaultValues?: Values;
  items: Item[];
}

const MessageForm = forwardRef(
  (modalProps: IFormProps, ref: ForwardedRef<unknown>) => {
    const { onSubmit, defaultValues, items } = modalProps;

    // 生成schema
    // const schemaObject: Record<string, yup.AnySchema> = {};
    // items.forEach((item) => {
    //   if (item.schema) {
    //     schemaObject[item.key] = item.schema;
    //   }
    // });
    // const schema = yup.object(schemaObject).required();

    const form = useForm({
      // resolver: yupResolver(schema),
      defaultValues,
    });

    useImperativeHandle(ref, () => ({
      form,
    }));

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = form;

    return (
      <form
        onSubmit={(e) => {
          if (onSubmit) handleSubmit(onSubmit)(e);
          reset();
        }}
      >
        <Stack
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
          spacing={2}
        >
          {items.map((item) => {
            const {
              component,
              render,
              key,
              registerOptions,
              registerFunction,
              ...options
            } = item;

            const Component = component || TextField;

            const error = !!get(errors, key, '');
            const helperText = get(errors, `${key}.message`, '');

            const newRegisterOptions = registerFunction
              ? registerFunction(form)
              : registerOptions;

            const componentProps = {
              form,
              key,
              error,
              helperText,
              ...options,
              ...register(key, newRegisterOptions),
            };

            if (render) {
              return render({ ...componentProps });
            }

            return <Component {...componentProps} />;
          })}
        </Stack>
      </form>
    );
  },
);

MessageForm.defaultProps = {};

export default MessageForm;
