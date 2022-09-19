import TextField from '@mui/material/TextField';
import UploadPictures from '@/components/Form/Fields/Upload';

const items = [
  {
    key: 'name',
    label: 'name',
    placeholder: 'name',
    registerOptions: {
      required: true,
    },
    component: TextField,
  },

  {
    key: 'description',
    label: 'description',
    placeholder: 'description',
    registerOptions: {
      required: true,
    },
    component: TextField,
  },

  {
    key: 'logo',
    registerOptions: {
      required: true,
    },
    component: UploadPictures,
  },
];

export default items;
