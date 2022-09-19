import Stack from '@mui/material/Stack';
import OrganizationList from '@/container/Organization/List';

export default function Home() {
  return (
    <Stack spacing={2}>
      <OrganizationList />
    </Stack>
  );
}
