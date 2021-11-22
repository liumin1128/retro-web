// import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
import DynamicList from '@/components/Dynamic/List';
import { DynamicsQuery, DynamicsResult } from '@/graphql/dynamic';

export default function DynamicListContainer() {
  const { data, loading, error } = useQuery<DynamicsResult>(DynamicsQuery);
  // console.log("data, loading, error");
  // console.log(data, loading, error);

  if (loading) return 'loading';
  if (error) return 'error';

  return (
    <div>
      <DynamicList data={data?.dynamics} />
    </div>
  );
}
