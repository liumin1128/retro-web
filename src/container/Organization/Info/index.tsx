import { history } from 'umi';
import uniqBy from 'lodash/uniqBy';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useFindOrganizationsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';
import Tooltip from '@mui/material/Tooltip';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindOrganizationsQuery();

  if (loading) return <Skeleton />;
  if (error) return <Error />;

  return (
    <Stack spacing={2}>
      <Stack
      // sx={{ justifyContent: 'center', alignItems: 'center'  }}
      >
        <Typography variant="h3">{data?.currentOrganization?.name}</Typography>
        <Box
          sx={{
            width: 80,
            height: 80,
            background: `url(${data?.currentOrganization?.logo})`,
            backgroundSize: 'cover',
          }}
        />
      </Stack>

      {/* {data?.myOrganizations?.map((i) => { */}
      {/*  if (!i) return null; */}
      {/*  return ( */}
      {/*    <Stack key={i?._id} spacing={1}> */}
      {/*      <Typography>{i.name}</Typography> */}
      {/*    </Stack> */}
      {/*  ); */}
      {/* })} */}

      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="body1">Members</Typography>
        <Button
          onClick={() => {
            history.push('/retro/organization');
          }}
        >
          Manage
        </Button>
      </Stack>

      <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
        {uniqBy(data?.currentOrganizationUsers, (i) => i.nickname).map((i) => {
          if (!i) return null;
          return (
            <Stack
              key={i?._id}
              spacing={1}
              sx={{
                m: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Tooltip title={i.nickname as string} placement="top" arrow>
                <Avatar
                  src={i.avatarUrl as string}
                  sx={{ borderRadius: 0.5, cursor: 'pointer' }}
                />
              </Tooltip>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
