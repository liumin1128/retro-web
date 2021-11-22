import { useSubscription } from '@apollo/client';
import { RETRO_SUBSCRIPTION } from '@/graphql/retro';

import RetroList from '@/container/Retro/List';
import CreateRetro from '@/container/Retro/Create';

export default function Home() {
  const { data, loading } = useSubscription(
    RETRO_SUBSCRIPTION,
    // { variables: { postID } }
  );

  console.log('RETRO_SUBSCRIPTION: data, loading');
  console.log(data, loading);

  return (
    <div>
      212
      <CreateRetro />
      <RetroList />
    </div>
  );
}

// export async function getServerSideProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: NewsListQuery,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//   };
// }
