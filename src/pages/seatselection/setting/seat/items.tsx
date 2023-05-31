import TagsSelect from '../../components/SeatTagsSelect';

export default [
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
