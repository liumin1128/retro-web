import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useQuery, useMutation } from '@apollo/client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Item from '@/components/Retro/Item';
import {
  RETROMESSAGE_SUBSCRIPTION,
  RETROMESSAGES_QUERY,
  RetroMessage,
  CREATE_RETROMESSAGE,
} from '@/graphql/retroMessage';
import Form from './Form';

const user = {
  avatar: 'http://',
  nickname: '本王今年八岁',
};

const Section: React.FunctionComponent = () => {
  const { data, loading, error, subscribeToMore } =
    useQuery<RetroMessage>(RETROMESSAGES_QUERY);

  const [createRetro] = useMutation<RetroMessage>(CREATE_RETROMESSAGE);

  useEffect(() => {
    subscribeToMore({
      document: RETROMESSAGE_SUBSCRIPTION,
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

    // return () => {
    //   unsubscribe();
    // };
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
                <Item key={i._id} user={user} content={i.content}>
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
