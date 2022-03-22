import Stack from '@mui/material/Stack';
import DynamicList from '@/container/Dynamic/List';
import CreateDynamic from '@/container/Dynamic/Create';

export default function Home() {
  return (
    <Stack spacing={2}>
      <CreateDynamic />
      <DynamicList />
    </Stack>
  );
}
