import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
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

const user = {
  avatar: 'http://',
  nickname: '本王今年八岁',
};

const Section: React.FunctionComponent = () => {
  const { data, loading, error, subscribeToMore } =
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

  if (loading) return 'loading';
  if (error) return 'error';

  const list = get(data, 'retroMessages', []);

  return (
    <div>
      <Container>
        <Grid container spacing={4} sx={{ mt: 10 }}>
          <Grid item xs={4}>
            <Form
              onSubmit={(values) => {
                console.log('values');
                console.log(values);
                createRetro({ variables: values });
              }}
            />
            {list.map((i) => {
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
                      variables: { _id: i._id, content: values.content },
                    });
                  }}
                >
                  {i.content}
                </Item>
              );
            })}
          </Grid>
          <Grid item xs={4}>
            <Item>11111</Item>
            <Item>11111</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>11111</Item>
            <Item>11111</Item>
            <Item>11111</Item>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Section;
