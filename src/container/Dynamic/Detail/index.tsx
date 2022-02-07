import { useFindDynamicQuery } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';
import DynamicItem from '@/components/Dynamic/Item';

interface DynamicDetailProps {
  id: string;
}

export default function DynamicDetailContainer(props: DynamicDetailProps) {
  const { id } = props;
  const { data, loading, error } = useFindDynamicQuery({
    variables: { _id: id },
  });

  if (loading) return <Skeleton />;
  if (error) return <Error />;
  if (!data?.findDynamic) return <Error />;

  return <DynamicItem data={data?.findDynamic} />;
}
