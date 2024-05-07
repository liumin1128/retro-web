import { useState, useRef, useEffect } from 'react';
import { useParams } from 'umi';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
import { useHeaderContext } from '@/context/useHeaderContext';
import QRCodeIconButton from '@/components/QRCodeIconButton';
import { user, placeholders, colors, TYPES } from './constants';
import { sortItem } from './utils';
import useRetroMessage from './useRetroMessage';
import DownMdTabs from './DownMd/Tabs';
import Loading from '@/components/Loading';

interface UpdateParams {
  content?: string;
  status?: string;
  type?: string;
}

const Section = () => {
  const params = useParams();
  const { retro } = params;
  const modalRef = useRef<ModalRefInstance<unknown>>();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [currentType, setCurrentType] = useState(TYPES[0]);

  const {
    data,
    loading,
    error,
    createRetro,
    updateRetro,
    deleteRetro,
    likeRetro,
  } = useRetroMessage({ retro: retro as string });

  const handleDelete = (_id: string) => {
    deleteRetro({ variables: { _id } });
  };

  const handleUpdate = (_id: string, variables: UpdateParams) => {
    updateRetro({
      variables: {
        _id,
        ...variables,
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

  const { setHeaderContent } = useHeaderContext();

  useEffect(() => {
    setHeaderContent(<QRCodeIconButton content={window.location.href} />); // 在进入页面时设置header内容
    return () => {
      setHeaderContent(null); // 在离开页面时清除header内容
    };
  }, [setHeaderContent]);

  if (loading) return <Loading />;
  if (error) return 'error';
  if (!data) return 'error';

  const list = get(data, 'retroMessages', []);
  const retroUserId = get(data, 'retro.user._id', '');
  const userId = get(data, 'userInfo._id', '');

  const isCreator = retroUserId === userId;
  const hasFocus =
    data.retroMessages.findIndex((message) => message.status === 'FOCUSED') !==
    -1;

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
    const hasAuth = isCreator || i.user._id === userId;
    return (
      <Item
        isCreator={isCreator}
        hasAuth={hasAuth}
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
        onUpdateContent={(variables: UpdateParams) => {
          handleUpdate(i._id, variables);
        }}
        onUpdateStatus={(variables: UpdateParams) => {
          if (!isCreator) {
            return;
          }
          handleUpdate(i._id, variables);
        }}
      >
        {i.content}
      </Item>
    );
  };

  if (!isUpMd) {
    const items = list.filter((i) => i.type === currentType);
    // .sort(sortItem);
    const color = colors[currentType];
    const placeholder = placeholders[currentType];

    return (
      <Box>
        <DownMdTabs type={currentType} onClick={setCurrentType} />

        <Box
          sx={{
            height: 'calc(100vh - 48px - 56px)',
            display: 'flex',
            flexDirection: 'column',
            p: 1,
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
            <Box sx={{ height: 80 }} />
          </Box>
        </Box>

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
          ref={modalRef}
          fullWidth
          title="Create Retro Message"
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start',
            },
          }}
          PaperProps={{
            sx: {
              width: '100%',
              borderRadius: 0,
              m: 0,
            },
          }}
          render={() => {
            return (
              <Box>
                <Form
                  autoFocus
                  color={color}
                  placeholder={placeholder}
                  onSubmit={(values) => {
                    handleCreate(currentType, values);
                    modalRef.current?.close();
                  }}
                />
              </Box>
            );
          }}
        />
      </Box>
    );
  }

  const listGroup = groupBy(list, 'type');

  return (
    <Container sx={{ height: 'calc(100vh - 64px)' }}>
      <Box
        sx={{
          height: '100%',
          pt: 1,
        }}
      >
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
                <Box sx={{ p: 0.5 }}>
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
                              // .sort(sortItem)
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
      </Box>
    </Container>
  );
};

export default Section;
