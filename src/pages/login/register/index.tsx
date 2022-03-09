import { useRef } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Form, { FormRefInstance } from '@/components/Form';
import items from './items';

const apiUrl = process.env.API_URL || '';

export default function Home() {
  const formRef = useRef<FormRefInstance>();

  const handleSubmit = (e) => {
    console.log(e);
  };

  const handleClick = () => {
    formRef.current?.form.handleSubmit(handleSubmit)();
  };

  return (
    <div>
      <Card sx={{ px: 2, py: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Register</Typography>
          <Form ref={formRef} items={items} />
          <Button size="large" variant="contained" onClick={handleClick}>
            Register
          </Button>
        </Stack>
      </Card>

      <br />

      <ul>
        <li>
          <a href={`${apiUrl}/oauth/github`}>github</a>
        </li>
        <li>
          <a href={`${apiUrl}/oauth/wechat`}>wechat</a>
        </li>
      </ul>
    </div>
  );
}
