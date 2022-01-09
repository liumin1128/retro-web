import DynamicList from '@/components/Dynamic/List';
import { useFindDynamicsQuery, Dynamic } from '@/generated/graphql';

export default function DynamicListContainer() {
  const { data, loading, error } = useFindDynamicsQuery();

  if (loading) return 'loading';
  if (error) return 'error';

  return (
    <div>
      <DynamicList data={data?.dynamics as Dynamic[]} />
    </div>
  );
}
