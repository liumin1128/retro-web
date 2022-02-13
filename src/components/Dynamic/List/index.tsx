import { history } from 'umi';
import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DynamicFieldsFragment } from '@/generated/graphql';
import UserInfo from '../components/UserInfo';
import Pictures from '../components/Pictures';

interface Props {
  data?: DynamicFieldsFragment[];
}

export default function DynamicList({ data }: Props) {
  return (
    <Stack spacing={8}>
      {data?.map((i) => {
        return (
          <Fragment key={i._id}>
            <Stack spacing={1.5}>
              <UserInfo
                createdAt={i.createdAt}
                avatarUrl={i.user?.avatarUrl}
                nickname={i.user?.nickname}
              />
              <Stack
                onClick={() => {
                  history.push(`/dynamic/${i._id}`);
                }}
              >
                <Typography variant="body1">{i.content}</Typography>
              </Stack>
              {i.pictures && i.pictures.length > 0 && (
                <Pictures pictures={i.pictures} />
              )}
            </Stack>
          </Fragment>
        );
      })}
    </Stack>
  );
}
