import { ControllerRenderProps, FieldValues, FormState } from 'react-hook-form';

export interface FormRenderProps {
  field: ControllerRenderProps<FieldValues, string>;
  formState: FormState<FieldValues>;
}

export function getHelperText(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  return '';
}
