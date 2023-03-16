import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import OrganizationManage from '@/container/Organization/Manage';

export default function Home() {
  return (
    <Container>
      <Stack spacing={2}>
        <OrganizationManage />
      </Stack>
    </Container>
  );
}
