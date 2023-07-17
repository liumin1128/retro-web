import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
// import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Button from '@mui/material/Button';
import Piaise from '@/components/Praise';
import GradientBackground from '@/components/GradientBackground';
import UserInfo from './components/UserInfo';
import Form from './components/Form';
import Pictures from './components/Pictures';

interface User {
  nickname: string;
  avatarUrl: string;
  username: string;
}

interface IItemProps {
  blur?: boolean;
  anonymous?: boolean;
  content?: string;
  pictures?: string[];
  status?: string;
  user?: User;
  like?: number;
  hasAuth?: boolean;
  isCreator?: boolean;
  onDelete?: () => void;
  onLike?: (count: number) => void;
  onUpdateContent?: (v: unknown) => void;
  onUpdateStatus?: (v: unknown) => void;
}

const Item: React.FunctionComponent<IItemProps> = (props) => {
  const {
    anonymous,
    content,
    like,
    status,
    user,
    blur,
    pictures,
    onLike,
    onDelete,
    onUpdateContent,
    onUpdateStatus,
    hasAuth,
    isCreator,
  } = props;

  const [edit, setEdit] = useState<boolean>(false);

  return (
    <Box>
      <GradientBackground
        status={status}
        blur={blur}
        focus={status === 'FOCUSED'}
      >
        <Box
          onClick={() => {
            if (!isCreator) return;
            onUpdateStatus({
              status: status === 'FOCUSED' ? 'NORMAL' : 'FOCUSED',
            });
          }}
        >
          {edit ? (
            <Form
              defaultValues={{ content }}
              onSubmit={(values) => {
                onUpdateContent(values);
                setEdit(false);
              }}
              onCancel={() => {
                setEdit(false);
              }}
              onDelete={() => {
                onDelete();
              }}
            />
          ) : (
            <>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  fontSize: 20,
                  overflow: 'hidden',
                  wordWrap: 'break-word',
                  mb: 2,
                }}
              >
                {content}
              </Typography>

              <Box
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{ mb: 1 }}
              >
                <Pictures pictures={pictures || []} />
              </Box>

              <Stack
                justifyContent="flex-start"
                direction="row"
                sx={{ mb: -1 }}
              >
                {!anonymous && (
                  <UserInfo
                    avatarUrl={user?.avatarUrl as string}
                    nickname={(user?.nickname || user?.username) as string}
                  />
                )}

                <Box sx={{ flex: 1 }} />

                {status === 'CLOSED' ? (
                  <CheckCircleOutlineOutlinedIcon color="secondary" sx={{}} />
                ) : (
                  <>
                    {status !== 'FOCUSED' && (
                      <Piaise
                        count={like}
                        onClick={(likeCount: number) => {
                          onLike(likeCount);
                        }}
                      />
                    )}

                    {hasAuth && status !== 'FOCUSED' && (
                      <IconButton
                        size="large"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEdit(!edit);
                        }}
                      >
                        <EditIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
                      </IconButton>
                    )}

                    {hasAuth && status === 'FOCUSED' && (
                      <Button
                        onClick={() => {
                          onUpdateStatus({
                            status: 'NORMAL',
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}

                    {hasAuth && status === 'FOCUSED' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateStatus({
                            status: 'CLOSED',
                          });
                        }}
                      >
                        Done
                      </Button>
                    )}
                  </>
                )}
              </Stack>
            </>
          )}
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default Item;
