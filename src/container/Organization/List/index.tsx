import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useFindOrganizationsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindOrganizationsQuery();

  if (loading) return <Skeleton />;
  if (error) return <Error />;
  
  return (
    <Stack spacing={8}>
      {data?.items?.map((i) => {
        if (!i) return null;
        return (
          <Stack key={i?._id} spacing={2}>
            <Card>
              <Typography>{i.name}</Typography>
              <Typography>{i.description}</Typography>
            </Card>
          </Stack>
        );
      })}
    </Stack>
  );
}
