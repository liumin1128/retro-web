import DynamicList from '@/components/Dynamic/List';
import { useFindDynamicsQuery, Dynamic } from '@/generated/graphql';
import Error from '@/components/Error/common';
import Skeleton from '@/components/Skeleton/Dynamic/List';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindDynamicsQuery();

  if (loading) return <Skeleton />;
  if (error) return <Error />;

  return (
    <div>
      <DynamicList data={data?.findDynamics as Dynamic[]} />
    </div>
  );
}
