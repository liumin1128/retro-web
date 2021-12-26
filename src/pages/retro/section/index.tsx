import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import Item from '@/components/Retro/Item';
import Form from '@/components/Retro/Form';
import Card from '@/components/Retro/Card';
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

const user = {
  avatar: 'http://',
  nickname: 'User',
};

const placeholders = {
  HAPPY: "I'm glad that...",
  WONDERRING: "I'm wondering about...",
  UNHAPPY: "It wasn't so great that...",
  TODO: 'Add an action item',
};

const colors = {
  HAPPY: 'success',
  WONDERRING: 'secondary',
  UNHAPPY: 'error',
  TODO: 'primary',
};

interface UpdateParams {
  content?: string;
  status?: string;
  type?: string;
}

function getSortNum(str) {
  if (str === 'CLOSED') return 0;
  return 1;
}

const Section: React.FunctionComponent = (props) => {
  const retro = get(props, 'match.params.retro');

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

  if (loading) return 'loading';
  if (error) return 'error';

  const list = get(data, 'retroMessages', []);
  const hasFocus =
    data.retroMessages.findIndex((message) => message.status === 'FOCUSED') !==
    -1;

  console.log('list render:', list);

  return (
    <Box>
      <Container sx={{ borderTop: '1px solid transparent' }} maxWidth="lg">
        <Grid container spacing={1}>
          {['HAPPY', 'WONDERRING', 'UNHAPPY', 'TODO'].map((type: string) => {
            return (
              <Grid
                key={type}
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <Box
                  sx={{
                    height: 'calc(100vh - 1px)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ p: 0.5 }}>
                    <Card>
                      <Form
                        color={colors[type]}
                        placeholder={placeholders[type] as string}
                        onSubmit={(values) => {
                          try {
                            createRetro({
                              variables: { type, retro, ...values },
                            }).catch((err) => {
                              console.log(err);
                            });
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      />
                    </Card>
                  </Box>

                  <Box
                    sx={{
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      flex: 1,
                    }}
                  >
                    {list
                      .filter((i) => i.type === type)
                      .sort((a, b) => {
                        return getSortNum(b.status) - getSortNum(a.status);
                      })
                      .map((i) => {
                        return (
                          <Item
                            blur={hasFocus && i.status !== 'FOCUSED'}
                            key={i._id}
                            user={i.user || user}
                            content={i.content}
                            status={i.status}
                            type={i.type}
                            like={i.like}
                            onDelete={() => {
                              deleteRetro({ variables: { _id: i._id } });
                            }}
                            onUpdate={async (params: UpdateParams) => {
                              await updateRetro({
                                variables: {
                                  _id: i._id,
                                  ...params,
                                },
                              });
                            }}
                            onLike={(count: number) => {
                              likeRetro({
                                variables: { _id: i._id, count },
                              });
                            }}
                          >
                            {i.content}
                          </Item>
                        );
                      })}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section;
