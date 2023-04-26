import { useFindRetrosQuery } from '@/generated/graphql';
import RetroList from '@/components/Retro/List';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function RetroListContainer() {
  const { data, loading, error } = useFindRetrosQuery({
    variables: { page: 1, pageSize: 10 },
  });

  // return <Loading />;

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <RetroList
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data={data?.findRetros || []}
      />
    </div>
  );
}
