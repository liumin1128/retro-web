import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useSnackbar } from 'notistack';
import Item from '@/components/Retro/Item';
import {
  RETROMESSAGES_QUERY,
  RetroMessage,
  CREATE_RETROMESSAGE,
  UPDATE_RETROMESSAGE,
  DELETE_RETROMESSAGE,
  CREATE_RETROMESSAGE_SUBSCRIPTION,
  UPDATE_RETROMESSAGE_SUBSCRIPTION,
  DELETE_RETROMESSAGE_SUBSCRIPTION,
} from '@/graphql/retroMessage';
import Form from './Form';
import { source$ } from '@/wrappers/apollo-provider/apollo';

const user = {
  avatar: 'http://',
  nickname: '本王今年八岁',
};

const Section: React.FunctionComponent = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, refetch, error, subscribeToMore } =
    useQuery<RetroMessage>(RETROMESSAGES_QUERY);

  // 会自动更新
  useSubscription(UPDATE_RETROMESSAGE_SUBSCRIPTION);

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
          retroMessages: [newItem, ...prev.retroMessages],
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

    // 3.5s后调用退订
    // 3.5s后不再接受到被推送的数据，但是Observable的source$资源并没有终结
    // 因为始终没有调用complete,只不过再也不会调用next函数了
    // setTimeout(() => {
    //   subscription.unsubscribe();
    // }, 3500);

    return () => {
      subscription.unsubscribe();
    };
  }, [enqueueSnackbar, refetch]);

  if (loading) return 'loading';
  if (error) return 'error';

  const list = get(data, 'retroMessages', []);

  console.log(list);

  return (
    <div>
      <Container>
        <Grid container spacing={4} sx={{ mt: 10 }}>
          {['HAPPY', 'WONDERRING', 'UNHAPPY', 'TODO'].map((type) => {
            return (
              <Grid key={type} item xs={3}>
                <Form
                  onSubmit={(values) => {
                    console.log('values');
                    console.log(values);
                    try {
                      createRetro({ variables: { type, ...values } }).catch(
                        (err) => {
                          console.log(err);
                        },
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
                {list
                  .filter((i) => i.type === type)
                  .map((i) => {
                    return (
                      <Item
                        key={i._id}
                        user={user}
                        content={i.content}
                        onDelete={() => {
                          console.log(i._id);
                          deleteRetro({ variables: { _id: i._id } });
                        }}
                        onUpdate={(values) => {
                          console.log(values);
                          updateRetro({
                            variables: {
                              _id: i._id,
                              type,
                              content: values.content,
                            },
                          });
                        }}
                      >
                        {i.content}
                      </Item>
                    );
                  })}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Section;
