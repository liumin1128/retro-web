import React, { useState } from 'react';
import get from 'lodash/get';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Item from '@/components/Retro/Item';
import Form from '@/components/Retro/Form';
import Card from '@/components/Retro/Card';
import useRetroMessage from './useRetroMessage';
import { user, placeholders, colors, TYPES, TabLabels } from './constants';

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
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  console.log('isUpMd:', isUpMd);

  const retro = get(props, 'match.params.retro');

  const [currentType, setCurrentType] = useState(TYPES[0]);

  const {
    data,
    loading,
    error,
    createRetro,
    updateRetro,
    deleteRetro,
    likeRetro,
  } = useRetroMessage({ retro });

  if (loading) return 'loading';
  if (error) return 'error';

  const list = get(data, 'retroMessages', []);

  const hasFocus =
    data.retroMessages.findIndex((message) => message.status === 'FOCUSED') !==
    -1;

  console.log('list render:', list);

  function renderItem(type) {
    return (
      <Box
        sx={{
          pt: 2,
          height: isUpMd ? 'calc(100vh - 65px)' : 'calc(100vh - 105px)',
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
              const sa = getSortNum(a.status);
              const sb = getSortNum(b.status);
              if (sa !== sb) return sb - sa;
              return b.createdAt - a.createdAt;
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
    );
  }

  if (!isUpMd) {
    return (
      <Box>
        <Tabs
          value={currentType}
          onChange={(e, v) => {
            setCurrentType(v);
          }}
        >
          {TYPES.map((i) => {
            return (
              <Tab
                key={i}
                label={TabLabels[i]}
                sx={{
                  width: '25%',
                  bgcolor: `${colors[i]}.main`,
                  color: '#fff !important',
                }}
                value={i}
              />
            );
          })}
        </Tabs>

        <Container maxWidth="lg">{renderItem(currentType)}</Container>
      </Box>
    );
  }

  return (
    <Box>
      <Container sx={{ borderTop: '1px solid transparent' }} maxWidth="lg">
        <Grid container spacing={1}>
          {TYPES.map((type: string) => {
            return (
              <Grid
                key={type}
                item
                xs={12}
                // sm={6}
                md={3}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                {renderItem(type)}
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section;
