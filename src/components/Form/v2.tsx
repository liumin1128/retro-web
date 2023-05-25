import {
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  ComponentType,
  ReactElement,
} from 'react';
import get from 'lodash/get';
import * as yup from 'yup';
import {
  useForm,
  UseFormReturn,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
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
  grid: Record<string, unknown>;
  component?: ComponentType;
  render?: (args: any) => ReactElement;
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

    useImperativeHandle(ref, () => ({
      form,
    }));

    const {
      control,
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
            const { component, render, key, grid } = item;

            const Component = component || TextField;

            const error = !!get(errors, key, '');
            const helperText = get(errors, `${key}.message`, '');

            return (
              <Grid key={key} item xs={12} {...grid}>
                {render ? (
                  <Controller name={key} control={control} render={render} />
                ) : (
                  <Component {...register(key)} />
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
