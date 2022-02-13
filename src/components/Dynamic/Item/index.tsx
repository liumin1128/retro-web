import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DynamicFieldsFragment } from '@/generated/graphql';
import UserInfo from '../components/UserInfo';
import Pictures from '../components/Pictures';

interface Props {
  data: DynamicFieldsFragment;
}

export default function DynamicList({ data }: Props) {
  return (
    <Stack spacing={2}>
      <UserInfo
        createdAt={data.createdAt as string}
        avatarUrl={data.user?.avatarUrl as string}
        nickname={data.user?.nickname as string}
      />
      <Typography variant="body1">{data.content}</Typography>
      {data.pictures && data.pictures.length > 0 && (
        <Pictures pictures={data.pictures} />
      )}
    </Stack>
  );
}
