import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import Card from '@/components/Retro/Card';
import Piaise from '@/components/Praise';

interface User {
  avatar: string;
  nickname: string;
}

interface IItemProps {
  content: string;
  user: User;
}

const Item: React.FunctionComponent<IItemProps> = (props) => {
  const { content, user } = props;
  return (
    <Box sx={{ mb: 2 }}>
      <Card
        sx={{
          '.action': {
            opacity: 0,
          },
          '&:hover': {
            '.action': {
              opacity: 1,
            },
          },
        }}
      >
        <Box className="toolbar" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Avatar
              src={user?.avatar}
              sx={{ width: 24, height: 24, fontSize: 12 }}
            >
              {user?.nickname[0]}
            </Avatar>
          </Box>

          <IconButton className="action" size="small">
            <DeleteIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
          </IconButton>

          <IconButton className="action" size="small">
            <EditIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
          </IconButton>

          {/* <IconButton className="action" size="small">
            <ThumbUpIcon sx={{ fontSize: '20px', color: '#bdbdbd' }} />
          </IconButton> */}

          <Piaise />
        </Box>

        {content}
      </Card>
    </Box>
  );
};

export default Item;
