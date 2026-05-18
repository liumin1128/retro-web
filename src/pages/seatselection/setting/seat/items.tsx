import TagsSelect from '../../components/SeatTagsSelect';
import { FormRenderProps } from '../../utils/forms';

export default [
  {
    key: 'tags',
    label: 'Tags',
    placeholder: 'Tags',
    registerOptions: {},
    render: (props: FormRenderProps) => {
      return <TagsSelect {...props} />;
    },
  },
];
