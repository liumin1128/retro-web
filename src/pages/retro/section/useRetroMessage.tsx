import { useEffect } from 'react';
import get from 'lodash/get';
// import { useSnackbar } from 'notistack';
import { StoreObject } from '@apollo/client';
import { source$ } from '@/wrappers/apollo-provider/apollo';
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

export default function useRetroMessage({ retro }: { retro: string }) {
  // const { enqueueSnackbar } = useSnackbar();

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

  // 会自动更新
  useRetroMessageUpdatedSubscription();
  useRetroMessageLikedSubscription();

  // https://www.apollographql.com/docs/react/v2/api/react-hooks/#usesubscription
  useRetroMessageDeletedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      const _id = get(subscriptionData, 'data.retroMessage._id');
      client.cache.modify({
        fields: {
          findRetroMessages(refs, { readField }) {
            return refs.filter(
              (ref: StoreObject) => _id !== readField('_id', ref),
            );
          },
        },
      });
    },
  });

  const [createRetro] = useCreateRetroMessageMutation();
  const [updateRetro] = useUpdateRetroMessageMutation();
  const [deleteRetro] = useDeleteRetroMessageMutation();
  const [likeRetro] = useLikeRetroMessageMutation();

  useEffect(() => {
    subscribeToMore({
      document: RetroMessageCreatedDocument,
      updateQuery: (prev, args) => {
        const { subscriptionData } = args;
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.retroMessage;
        return {
          ...prev,
          retroMessages: [...prev.retroMessages, newItem],
        };
      },
    });
  }, [subscribeToMore]);

  // 订阅断线重连
  useEffect(() => {
    // subscribe函数的返回结果存为变量subscription
    const subscription = source$.subscribe({
      complete: () => {
        console.log('complete:');
      },
      next: (s) => {
        console.log('next:', s);
        switch (s) {
          case 'onConnected': {
            // enqueueSnackbar('Connected', {
            //   variant: 'success',
            //   autoHideDuration: 1000,
            // });
            break;
          }
          case 'onReconnected': {
            // enqueueSnackbar('Reconnected', {
            //   variant: 'success',
            //   autoHideDuration: 1000,
            // });
            refetch();
            break;
          }
          case 'onDisconnected': {
            // enqueueSnackbar('Disconnected', {
            //   variant: 'error',
            //   autoHideDuration: 1000,
            // });
            break;
          }
          case 'onReconnecting': {
            // enqueueSnackbar('Reconnecting', {
            //   variant: 'info',
            //   autoHideDuration: 1000,
            // });
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
