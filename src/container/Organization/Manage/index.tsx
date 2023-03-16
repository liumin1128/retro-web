import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useFindOrganizationsQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';
import CloseIcon from '@mui/icons-material/Close';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindOrganizationsQuery();

  const handleRemove = (user: string) => () => {
    console.log('user');
    console.log(user);
  };

  if (loading) return <Skeleton />;
  if (error) return <Error />;

  return (
    <Stack spacing={2}>
      <Stack>
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
      {/* if (!i) return null; */}
      {/* return ( */}
      {/*   <Stack key={i?._id} spacing={1}> */}
      {/*     <Typography>{i.name}</Typography> */}
      {/*   </Stack> */}
      {/* ); */}
      {/* })} */}

      <Typography variant="h5">Invitations</Typography>
      <Typography variant="body1">已发送邀请</Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
        {data?.currentOrganizationUsers?.map((i) => {
          if (!i) return null;
          return (
            <Stack
              key={i?._id}
              spacing={1}
              sx={{
                p: 1,
                width: 100,
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Avatar src={i.avatarUrl} />
              <Typography variant="body2">{i.nickname}</Typography>
              <Button color="error" onClick={handleRemove(i._id)}>
                cancel
              </Button>
            </Stack>
          );
        })}
      </Stack>

      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h5">Members</Typography>
      </Stack>

      <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
        {data?.currentOrganizationUsers?.map((i) => {
          if (!i) return null;
          return (
            <Stack
              key={i?._id}
              spacing={1}
              sx={{
                p: 1,
                width: 100,
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Avatar src={i.avatarUrl} />
              <Typography variant="caption">{i.nickname}</Typography>
              <IconButton color="error" onClick={handleRemove(i._id)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
