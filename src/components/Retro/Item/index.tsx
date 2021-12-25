import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Button from '@mui/material/Button';
import Piaise from '@/components/Praise';
import GradientBackground from '@/components/GradientBackground';
import UserInfo from './components/UserInfo';
import Form from './components/Form';

interface User {
  avatar: string;
  nickname: string;
}

interface IItemProps {
  blur: boolean;
  content: string;
  status: string;
  // type: string;
  user: User;
  like: number;
  onUpdate: (v: unknown) => void;
  onDelete: () => void;
  onLike: (count: number) => void;
}

const Item: React.FunctionComponent<IItemProps> = (props) => {
  const { content, user, like, status, blur, onUpdate, onDelete, onLike } =
    props;
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <Box sx={{ mb: 1 }}>
      <GradientBackground
        status={status}
        blur={blur}
        focus={status === 'FOCUSED'}
      >
        <Box
          onClick={() => {
            onUpdate({ status: status === 'FOCUSED' ? 'NORMAL' : 'FOCUSED' });
          }}
        >
          {edit ? (
            <Form
              defaultValues={{ content }}
              onSubmit={(values) => {
                onUpdate(values);
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
                className="toolbar"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: -0.5,
                }}
              >
                {status !== 'FOCUSED' && (
                  <UserInfo avatar={user?.avatar} nickname={user?.nickname} />
                )}

                {status === 'FOCUSED' && (
                  <Button
                    size="small"
                    color="inherit"
                    onClick={() => {
                      onUpdate({
                        status: 'NORMAL',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}

                <Box sx={{ flex: 1 }} />

                {status === 'CLOSED' ? (
                  <CheckCircleOutlineOutlinedIcon color="secondary" sx={{}} />
                ) : (
                  <>
                    <Piaise
                      count={like}
                      onClick={(likeCount: number) => {
                        onLike(likeCount);
                      }}
                    />

                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEdit(!edit);
                      }}
                    >
                      <EditIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
                    </IconButton>

                    {status === 'FOCUSED' && (
                      <Button
                        sx={{ ml: 1 }}
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdate({
                            status: 'CLOSED',
                          });
                        }}
                      >
                        Done
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </GradientBackground>
    </Box>
  );
};

export default Item;
