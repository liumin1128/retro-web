import Stack from '@mui/material/Stack';
import {
  useFindDynamicsQuery,
  useCreateLikeMutation,
  LikeObjectUnionModel,
  DynamicFieldsFragmentDoc,
  DynamicFieldsFragment,
} from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';
import DynamicItem from '@/components/Dynamic/Item';
import Toolbar from '@/components/Dynamic/Toolbar';
import { goto } from '@/utils/route';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindDynamicsQuery();

  const [createLike] = useCreateLikeMutation();

  const handleLike = (dynamic: DynamicFieldsFragment) => {
    createLike({
      variables: {
        object: dynamic._id,
        objectModel: LikeObjectUnionModel.Dynamic,
      },
      // eslint-disable-next-line no-shadow
      update(cache, { data }) {
        cache.updateFragment(
          {
            id: `Dynamic:${dynamic._id}`,
            fragment: DynamicFieldsFragmentDoc,
          },
          (item) => {
            let likeStatus;
            let likeCount = dynamic.likeCount || 0;
            if (data?.createLike) {
              likeCount += 1;
              likeStatus = true;
            } else {
              likeCount -= 1;
              likeStatus = false;
            }
            return { ...item, likeCount, likeStatus };
          },
        );
      },
    });
  };

  if (loading) return <Skeleton />;
  if (error) return <Error />;

  return (
    <Stack spacing={8}>
      {data?.findDynamics?.map((i) => {
        if (!i) return null;
        return (
          <Stack key={i?._id} spacing={2}>
            <DynamicItem data={i} />
            <Toolbar
              likeStatus={i.likeStatus as boolean}
              likeCount={i.likeCount as number}
              commentCount={i.commentCount as number}
              shareCount={i.shareCount as number}
              onLike={() => {
                handleLike(i);
              }}
              onComment={() => {
                goto(`/dynamic/${i._id}`);
              }}
              onShare={() => {
                return null;
              }}
            />
          </Stack>
        );
      })}
    </Stack>
  );
}
