import RetroList from '@/components/Retro/List';
import { useFindRetrosQuery } from '@/generated/graphql';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function RetroListContainer() {
  const { data, loading, error } = useFindRetrosQuery({
    variables: { page: 1, pageSize: 10 },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <RetroList data={data?.findRetros || []} />
    </div>
  );
}
