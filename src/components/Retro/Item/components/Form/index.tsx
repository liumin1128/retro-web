import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    content: yup.string().required(),
  })
  .required();

interface Values {
  content: string;
}

interface IFormProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: Values) => void;
  onCancel: () => void;
  onDelete: () => void;
  defaultValues?: Values;
  placeholder?: string;
}

const MessageForm: React.FunctionComponent<IFormProps> = ({
  onSubmit,
  onCancel,
  onDelete,
  defaultValues,
  placeholder,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
          reset();
        }}
      >
        <Stack
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
          spacing={2}
        >
          <TextField
            autoFocus
            label={placeholder}
            variant="outlined"
            fullWidth
            multiline
            minRows={2}
            error={!!errors?.content}
            helperText={errors?.content?.message}
            type="submit"
            {...register('content', { required: true })}
          />

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
            <Box sx={{ flex: 1 }} />
            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
            </IconButton>
            <Button
              size="small"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

MessageForm.defaultProps = {
  placeholder: 'Content',
};

export default MessageForm;
