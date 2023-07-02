import TagsSelect from '../../components/TagsSelect';

export default [
  {
    key: 'nickname',
    registerOptions: {
      required: { value: true, message: 'required' },
    },
    componentProps: {
      fullWidth: true,
      placeholder: 'Nickname',
      label: 'Nickname',
    },
  },
  {
    key: 'index',
    componentProps: {
      fullWidth: true,
      placeholder: 'Index (e.g. 1, 2, 3)',
      label: 'Index',
    },
  },
  {
    key: 'tags',
    label: 'Tags',
    placeholder: 'Tags',
    registerOptions: {},
    render: (props) => {
      return <TagsSelect {...props} />;
    },
  },
];
