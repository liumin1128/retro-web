import { Dynamic } from '@/generated/graphql';

interface Props {
  data?: Dynamic[];
}

export default function DynamicList({ data }: Props) {
  return (
    <div>
      {data?.map((i) => {
        return (
          <div key={i._id}>
            <p>{i.content}</p>
          </div>
        );
      })}
    </div>
  );
}
