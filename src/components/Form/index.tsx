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
import Grid from '@mui/material/Grid';
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
        <Grid container spacing={4}>
          {items.map((item) => {
            const {
              component,
              render,
              key,
              registerOptions,
              registerFunction,
              gridProps,
              ...options
            } = item;

            const Component = component || TextField;

            const error = !!get(errors, key, '');
            const helperText = get(errors, `${key}.message`, '');

            const newRegisterOptions = registerFunction
              ? registerFunction(form)
              : registerOptions;

            const registerProps = register(key, newRegisterOptions);
            console.log('registerProps');
            console.log(registerProps);

            const componentProps = {
              form,
              key,
              error,
              helperText,
              ...options,
              ...registerProps,
            };

            return (
              <Grid key={key} item xs={12} {...gridProps}>
                <Stack>
                  {render ? (
                    render({ ...componentProps })
                  ) : (
                    <Component {...componentProps} />
                  )}
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </form>
    );
  },
);

MessageForm.defaultProps = {};

export default MessageForm;
