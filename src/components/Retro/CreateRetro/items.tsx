import Select from '@/components/Form/Fields/Select';

const items = [
  {
    key: 'title',
    label: 'title',
    placeholder: 'title',
  },
  {
    key: 'date',
    label: 'date',
    placeholder: 'date',
    type: 'date',
    InputLabelProps: {
      shrink: true,
    },
  },
  {
    key: 'content',
    label: 'content',
    placeholder: 'content',
  },
  {
    key: 'anonymous',
    label: 'userInfo',
    placeholder: 'userInfo',
    render: (props) => {
      return (
        <Select
          {...props}
          options={[
            { value: false, label: 'visible' },
            { value: true, label: 'hide' },
          ]}
        />
      );
    },
  },
];

export default items;
