import { useEffect } from 'react';
import { StoreObject } from '@apollo/client';
import {
  RetroMessageCreatedDocument,
  useFindRetroSectionQuery,
  useCreateRetroMessageMutation,
  useUpdateRetroMessageMutation,
  useDeleteRetroMessageMutation,
  useLikeRetroMessageMutation,
  useRetroMessageLikedSubscription,
  useRetroMessageUpdatedSubscription,
  useRetroMessageDeletedSubscription,
} from '@/generated/graphql';
import { source$ } from '@/wrappers/apollo/client';

export default function useRetroMessage({ retro }: { retro: string }) {
  const {
    data = {},
    loading,
    refetch,
    error,
    subscribeToMore,
  } = useFindRetroSectionQuery({
    variables: {
      retro,
    },
  });

  const [createRetro] = useCreateRetroMessageMutation();
  const [updateRetro] = useUpdateRetroMessageMutation();
  const [deleteRetro] = useDeleteRetroMessageMutation();
  const [likeRetro] = useLikeRetroMessageMutation();

  useRetroMessageUpdatedSubscription();
  useRetroMessageLikedSubscription();

  // 订阅断线重连
  useEffect(() => {
    const subscription = source$.subscribe({
      next: (type) => {
        switch (type) {
          case 'connected': {
            console.log('断线重连...');
            refetch();
            break;
          }
          default:
        }
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [refetch]);

  // https://www.apollographql.com/docs/react/v2/api/react-hooks/#usesubscription
  useRetroMessageDeletedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.cache.modify({
        fields: {
          findRetroMessages(refs, { readField }) {
            return refs.filter(
              (ref: StoreObject) =>
                subscriptionData.data?.retroMessage?._id !==
                readField('_id', ref),
            );
          },
        },
      });
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: RetroMessageCreatedDocument,
      updateQuery: (prev, args) => {
        // eslint-disable-next-line
        // @ts-ignore
        const { subscriptionData } = args;
        if (!subscriptionData.data) return prev;
        // eslint-disable-next-line
        // @ts-ignore
        const newItem = subscriptionData.data.retroMessage;
        return {
          ...prev,
          // eslint-disable-next-line
          // @ts-ignore
          retroMessages: [...prev.retroMessages, newItem],
        };
      },
    });
  }, [subscribeToMore]);

  return {
    data,
    loading,
    error,
    createRetro,
    updateRetro,
    deleteRetro,
    likeRetro,
  };
}
