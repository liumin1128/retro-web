import {
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  ComponentType,
  ReactElement,
} from 'react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import {
  useForm,
  UseFormReturn,
  Controller,
  RegisterOptions,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export interface FormRefInstance {
  form: UseFormReturn;
  submit: () => void;
}

interface Values {
  [key: string]: unknown;
}

interface Item {
  key: string;
  label?: string;
  grid?: Record<string, unknown>;
  component?: ComponentType;
  render?: (...args: any) => ReactElement;
  registerOptions?: RegisterOptions;
  componentProps?: Record<string, unknown>;
}

interface IFormProps {
  onSubmit?: (values: Values) => void;
  defaultValues?: Values;
  items: Item[];
}

const MessageForm = forwardRef(
  (modalProps: IFormProps, ref: ForwardedRef<unknown>) => {
    const { onSubmit, defaultValues, items } = modalProps;

    const form = useForm({
      defaultValues,
    });

    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = form;

    useImperativeHandle(ref, () => ({
      form,
      submit: async () => {
        if (onSubmit) {
          await form.handleSubmit(onSubmit)();
        }
        if (!isEmpty(form.formState.errors)) {
          throw new Error('error');
        }
      },
    }));

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
              grid,
              registerOptions,
              componentProps,
            } = item;

            const Component = component || TextField;

            const error = !!get(errors, key, '');
            const helperText = get(errors, `${key}.message`, '');

            return (
              <Grid key={key} item xs={12} {...grid}>
                {render ? (
                  <Controller
                    name={key}
                    control={control}
                    rules={registerOptions}
                    render={render}
                  />
                ) : (
                  <Component
                    error={error}
                    helperText={helperText as string}
                    {...componentProps}
                    {...register(key, registerOptions)}
                  />
                )}
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
