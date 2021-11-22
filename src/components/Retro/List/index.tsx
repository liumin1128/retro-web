import { Retro } from '@/graphql/retro';

interface Props {
  data?: Retro[];
}

export default function RetroList({ data }: Props) {
  return (
    <div>
      {data?.map((i) => {
        return (
          <div key={i._id}>
            {/* <Link href={`/news/detail?_id=${i._id}`}>{i._id}</Link> */}
            <p>{i.content}</p>
          </div>
        );
      })}
    </div>
  );
}
