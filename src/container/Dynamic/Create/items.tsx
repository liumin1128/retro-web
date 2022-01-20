import TextField from '@mui/material/TextField';
import UploadPictures from '@/components/Form/Fields/Upload';

const items = [
  {
    key: 'content',
    label: 'content',
    placeholder: 'content',
    rows: 5,
    multiline: true,
    registerOptions: {
      required: true,
    },
    component: TextField,
  },

  {
    key: 'pictures',
    component: UploadPictures,
  },
];

export default items;
