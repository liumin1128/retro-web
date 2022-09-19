import Stack from '@mui/material/Stack';
import CreateOrganization from '@/container/Organization/Create';

export default function Home() {
  return (
    <Stack spacing={2}>
      <CreateOrganization />
    </Stack>
  );
}
