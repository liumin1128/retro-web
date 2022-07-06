import { useState, useRef, useEffect, FunctionComponent } from 'react';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
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
import { RetroMessageType } from '@/generated/graphql';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import useRetroMessage from './useRetroMessage';
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
    const obj = data?.retroMessages?.find(
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
  if (!data) return 'error';

  const list = get(data, 'retroMessages', []);
  const retroUserId = get(data, 'retro.user._id', '');
  const userId = get(data, 'userInfo._id', '');

  const isCreator = retroUserId === userId;
  const hasFocus =
    data.retroMessages.findIndex((message) => message.status === 'FOCUSED') !==
    -1;

  if (hasFocus) {
    const obj = data.retroMessages.find(
      (message) => message.status === 'FOCUSED',
    );
    if (obj.type !== currentType) {
      setCurrentType(obj.type);
    }
  }

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

  const onDragEnd = (result: DropResult) => {
    const _id = result.draggableId;
    const type = result?.destination?.droppableId;
    updateRetro({
      variables: {
        _id,
        type,
      },
    });
  };

  const renderItem = (i) => {
    return (
      <Item
        anonymous={data?.retro?.anonymous || i.anonymous}
        blur={hasFocus && i.status !== 'FOCUSED'}
        key={i._id}
        user={i.user || user}
        content={i.content}
        status={i.status}
        pictures={i.pictures}
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
  };

  function renderItems(type: string) {
    const items = list.filter((i) => i.type === type).sort(sortItem);
    return (
      <Box
        sx={{
          height: isUpMd ? 'calc(100vh - 4px)' : 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            flex: 1,
          }}
        >
          {items.map((i) => {
            return renderItem(i);
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

        <Container sx={{ p: isUpMd ? undefined : 1 }}>
          {renderItems(currentType)}
        </Container>

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

  const listGroup = groupBy(list, 'type');

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      <Container sx={{ height: '100%' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid
            container
            spacing={1}
            sx={{
              height: '100%',
            }}
          >
            {TYPES.map((type) => (
              <Grid
                key={type}
                item
                xs={12}
                md={3}
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ p: 0.5, mt: 1 }}>
                  <Card>{renderForm(type)}</Card>
                </Box>

                <Box
                  sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    flex: 1,
                    height: '100%',
                  }}
                >
                  <Droppable key={type} droppableId={type}>
                    {(
                      droppableProvided: DroppableProvided,
                      droppableSnapshot: DroppableStateSnapshot,
                    ) => {
                      let background = '';
                      let border = '';

                      if (droppableSnapshot.isDraggingOver) {
                        background = 'rgba(173,216,230,0.1)';
                        border = '1px rgba(173,216,230,1) dashed';
                      }

                      return (
                        <Box
                          {...droppableProvided.droppableProps}
                          ref={droppableProvided.innerRef}
                          sx={{
                            height: '100%',
                            background,
                            border,
                          }}
                        >
                          {Array.isArray(listGroup[type]) &&
                            listGroup[type]
                              .sort(sortItem)
                              .map((item, idx: number) => {
                                if (!item) return null;
                                return (
                                  <Draggable
                                    key={item._id}
                                    draggableId={item._id}
                                    index={idx}
                                  >
                                    {(
                                      draggableProvided: DraggableProvided,
                                      // snapshot: DraggableStateSnapshot,
                                    ) => (
                                      <Box
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        sx={{
                                          userSelect: 'none',
                                          mb: 1,
                                          ...draggableProvided.draggableProps
                                            .style,
                                        }}
                                      >
                                        {renderItem(item)}
                                      </Box>
                                    )}
                                  </Draggable>
                                );
                              })}
                          {droppableProvided.placeholder}
                        </Box>
                      );
                    }}
                  </Droppable>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Container>
    </Box>
  );
};

export default Section;
