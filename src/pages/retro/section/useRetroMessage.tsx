import { useEffect } from 'react';
import get from 'lodash/get';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useSnackbar } from 'notistack';
import {
  RETROMESSAGES_QUERY,
  RetroMessage,
  CREATE_RETROMESSAGE,
  UPDATE_RETROMESSAGE,
  DELETE_RETROMESSAGE,
  LIKE_RETROMESSAGE,
  CREATE_RETROMESSAGE_SUBSCRIPTION,
  UPDATE_RETROMESSAGE_SUBSCRIPTION,
  DELETE_RETROMESSAGE_SUBSCRIPTION,
  LIKE_RETROMESSAGE_SUBSCRIPTION,
} from '@/graphql/retroMessage';
import { source$ } from '@/wrappers/apollo-provider/apollo';

export default function useRetroMessage({ retro }) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    data = [],
    loading,
    refetch,
    error,
    subscribeToMore,
  } = useQuery<RetroMessage>(RETROMESSAGES_QUERY, {
    variables: {
      retro,
    },
  });

  // 会自动更新
  useSubscription(UPDATE_RETROMESSAGE_SUBSCRIPTION);
  useSubscription(LIKE_RETROMESSAGE_SUBSCRIPTION);

  // https://www.apollographql.com/docs/react/v2/api/react-hooks/#usesubscription
  useSubscription(DELETE_RETROMESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const _id = get(subscriptionData, 'data.retroMessageDeleted._id');
      client.cache.modify({
        fields: {
          retroMessages(refs, { readField }) {
            return refs.filter((ref) => _id !== readField('_id', ref));
          },
        },
      });
    },
  });

  const [createRetro] = useMutation<RetroMessage>(CREATE_RETROMESSAGE);
  const [updateRetro] = useMutation<RetroMessage>(UPDATE_RETROMESSAGE);
  const [deleteRetro] = useMutation<RetroMessage>(DELETE_RETROMESSAGE);
  const [likeRetro] = useMutation<RetroMessage>(LIKE_RETROMESSAGE);

  useEffect(() => {
    subscribeToMore({
      document: CREATE_RETROMESSAGE_SUBSCRIPTION,
      variables: {},
      updateQuery: (
        prev: { retroMessages: RetroMessage[] },
        args: {
          subscriptionData: {
            data: {
              retroMessageCreated: RetroMessage;
            };
          };
        },
      ) => {
        const { subscriptionData } = args;
        if (!subscriptionData.data) return prev;
        const newItem = subscriptionData.data.retroMessageCreated;
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
            enqueueSnackbar('Connected', { variant: 'success' });
            break;
          }
          case 'onReconnected': {
            enqueueSnackbar('Reconnected', { variant: 'success' });
            refetch();
            break;
          }
          case 'onDisconnected': {
            enqueueSnackbar('Disconnected', { variant: 'error' });
            break;
          }
          case 'onReconnecting': {
            enqueueSnackbar('Reconnecting', { variant: 'info' });
            break;
          }
          default:
        }
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [enqueueSnackbar, refetch]);

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
