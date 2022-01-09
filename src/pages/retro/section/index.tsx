import { useState, useRef, useEffect, FunctionComponent } from 'react';
import get from 'lodash/get';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Item from '@/components/Retro/Item';
import Form from '@/components/Retro/Form';
import Card from '@/components/Retro/Card';
import ModalRef, { ModalRefInstance } from '@/components/ModalRef/Dialog';
import useRetroMessage from './useRetroMessage';
import { RetroMessageType } from '@/generated/graphql';
import { user, placeholders, colors, TYPES, TabLabels } from './constants';
import { sortItem } from './utils';

interface UpdateParams {
  content?: string;
  status?: string;
  type?: string;
}

const Section: FunctionComponent = (props) => {
  const modalRef = useRef<ModalRefInstance<unknown>>();

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

  useEffect(() => {
    const obj = data?.findRetroMessages?.find(
      (message) => message.status === 'FOCUSED',
    );

    if (obj && obj.type !== currentType) {
      setCurrentType(obj.type);
    }
  }, [currentType, data]);

  const handleDelete = (_id: string) => {
    deleteRetro({ variables: { _id } });
  };

  const handleUpdate = (_id: string, params: UpdateParams) => {
    updateRetro({
      variables: {
        _id,
        ...params,
      },
    });
  };

  const handleLike = (_id: string, count: number) => {
    likeRetro({
      variables: { _id, count },
    });
  };

  const handleCreate = (
    type: RetroMessageType,
    values: Record<string, unknown>,
  ) => {
    createRetro({
      variables: { type, retro, ...values },
    });
  };

  if (loading) return 'loading';
  if (error) return 'error';

  const list = get(data, 'findRetroMessages', []);
  const retroUserId = get(data, 'findRetro.user._id', '');
  const userId = get(data, 'findUserInfo._id', '');

  const isCreator = retroUserId === userId;
  const hasFocus =
    data.findRetroMessages.findIndex(
      (message) => message.status === 'FOCUSED',
    ) !== -1;

  if (hasFocus) {
    const obj = data.findRetroMessages.find(
      (message) => message.status === 'FOCUSED',
    );
    if (obj.type !== currentType) {
      setCurrentType(obj.type);
    }
  }

  console.log('list render:', list);

  function renderForm(type, autoFocus = false) {
    const color = colors[type];
    const placeholder = placeholders[type];
    return (
      <Form
        autoFocus={autoFocus}
        color={color}
        placeholder={placeholder}
        onSubmit={(values) => {
          handleCreate(type, values);
          modalRef.current?.close();
        }}
      />
    );
  }

  function renderItem(type: string) {
    const items = list.filter((i) => i.type === type).sort(sortItem);
    return (
      <Box
        sx={{
          pt: 2,
          height: isUpMd ? 'calc(100vh - 65px)' : 'calc(100vh - 105px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isUpMd && (
          <Box sx={{ p: 0.5 }}>
            <Card>{renderForm(type)}</Card>
          </Box>
        )}

        <Box
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            flex: 1,
          }}
        >
          {items.map((i) => {
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
                  handleDelete(i._id);
                }}
                onLike={(count: number) => {
                  handleLike(i._id, count);
                }}
                onUpdateContent={(params: UpdateParams) => {
                  handleUpdate(i._id, params);
                }}
                onUpdateStatus={(params: UpdateParams) => {
                  if (!isCreator) {
                    return;
                  }
                  handleUpdate(i._id, params);
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
          TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
          }}
          sx={{
            '& .MuiTabs-indicator': {
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              height: 4,
            },
            '& .MuiTabs-indicatorSpan': {
              width: '100%',
              height: 4,
              backgroundColor: '#fff',
            },
          }}
        >
          {TYPES.map((i) => {
            const label = TabLabels[i];
            const color = colors[i];
            return (
              <Tab
                key={i}
                label={label}
                sx={{
                  width: '25%',
                  bgcolor: `${color}.main`,
                  color: '#fff !important',
                }}
                value={i}
              />
            );
          })}
        </Tabs>

        <Container maxWidth="lg">{renderItem(currentType)}</Container>

        <Fab
          sx={{
            position: 'absolute',
            bottom: 24,
            right: 24,
          }}
          onClick={() => {
            modalRef.current?.open();
          }}
          color="primary"
        >
          <EditIcon />
        </Fab>

        <ModalRef
          title="Create"
          ref={modalRef}
          fullWidth
          render={() => {
            return <Box>{renderForm(currentType, true)}</Box>;
          }}
        />
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
                item
                xs={12}
                md={3}
                key={type}
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
