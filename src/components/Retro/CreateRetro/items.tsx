import * as yup from 'yup';

const items = [
  {
    key: 'title',
    label: 'title',
    placeholder: 'title',
    schema: yup.string().required(),
  },
  {
    key: 'date',
    label: 'date',
    placeholder: 'date',
    schema: yup.string().required(),
    type: 'date',
    InputLabelProps: {
      shrink: true,
    },
  },
  {
    key: 'content',
    label: 'content',
    placeholder: 'content',
    schema: yup.string().required(),
  },
];

export default items;
