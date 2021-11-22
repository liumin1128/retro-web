import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
    <Box sx={{ mb: 4 }}>
      <Card>
        <Avatar src={user?.avatar} sx={{ width: 24, height: 24, fontSize: 12 }}>
          {user?.nickname[0]}
        </Avatar>

        {content}
      </Card>
      <Piaise />
    </Box>
  );
};

export default Item;
