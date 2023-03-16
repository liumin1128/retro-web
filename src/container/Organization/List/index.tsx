import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFindOrganizationsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindOrganizationsQuery();

  if (loading) return <Skeleton />;
  if (error) return <Error />;

  return (
    <Stack spacing={1}>
      {data?.myOrganizations?.map((i) => {
        if (!i) return null;
        return (
          <Stack key={i?._id} spacing={1}>
            <Typography>{i.name}</Typography>
          </Stack>
        );
      })}

      {data?.currentOrganizationUsers?.map((i) => {
        if (!i) return null;
        return (
          <Stack key={i?._id} spacing={1}>
            <Typography>{i.nickname}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
