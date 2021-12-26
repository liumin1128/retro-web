import { useQuery } from '@apollo/client';
import RetroList from '@/components/Retro/List';
import { RetrosQuery, RetrosResult } from '@/graphql/retro';

export default function RetroListContainer() {
  const { data, loading, error } = useQuery<RetrosResult>(RetrosQuery);

  if (loading) return 'loading';
  if (error) return 'error';

  return (
    <div>
      <RetroList data={data?.retros} />
    </div>
  );
}
