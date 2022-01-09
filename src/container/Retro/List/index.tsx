import RetroList from '@/components/Retro/List';
import { useFindRetrosQuery, Retro } from '@/generated/graphql';

export default function RetroListContainer() {
  const { data, loading, error } = useFindRetrosQuery();

  if (loading) return 'loading';
  if (error) return 'error';

  return (
    <div>
      <RetroList data={data?.findRetros as Retro[]} />
    </div>
  );
}
