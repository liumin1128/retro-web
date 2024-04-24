import { useEffect } from 'react';
import { StoreObject } from '@apollo/client';
import {
  RetroMessageFieldsFragmentDoc,
  useFindRetroSectionQuery,
  useCreateRetroMessageMutation,
  useUpdateRetroMessageMutation,
  useDeleteRetroMessageMutation,
  useLikeRetroMessageMutation,
  useRetroMessageLikedSubscription,
  useRetroMessageCreatedSubscription,
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
  } = useFindRetroSectionQuery({
    variables: {
      retro,
    },
  });

  const [createRetro] = useCreateRetroMessageMutation();
  const [updateRetro] = useUpdateRetroMessageMutation();
  const [deleteRetro] = useDeleteRetroMessageMutation();
  const [likeRetro] = useLikeRetroMessageMutation();

  useRetroMessageCreatedSubscription({
    variables: {
      retroID: retro,
    },
    // eslint-disable-next-line no-shadow
    onData: ({ client, data }) => {
      client.cache.modify({
        fields: {
          findRetroMessages(list = []) {
            const item = client.cache.writeFragment({
              data: data.data?.retroMessage,
              fragment: RetroMessageFieldsFragmentDoc,
            });
            return [item, ...list];
          },
        },
      });
    },
  });

  useRetroMessageUpdatedSubscription({
    variables: {
      retroID: retro,
    },
  });

  useRetroMessageLikedSubscription({
    variables: {
      retroID: retro,
    },
  });

  // https://www.apollographql.com/docs/react/v2/api/react-hooks/#usesubscription
  useRetroMessageDeletedSubscription({
    variables: {
      retroID: retro,
    },
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

  // 订阅断线重连
  useEffect(() => {
    const subscription = source$.subscribe({
      next: (type) => {
        switch (type) {
          case 'connected': {
            console.log('reconnected');
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
