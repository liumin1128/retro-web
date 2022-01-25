import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

interface INavProps {
  pictures: string[];
  current: number;
  setCurrent: (value: number) => void;
}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const { pictures, current, setCurrent } = props;
  return (
    <Box sx={{ display: 'flex' }}>
      {pictures.map((pic, index) => {
        const activeStyle =
          current === index
            ? {
                border: '2px red solid',
              }
            : {};

        return (
          <CardMedia
            key={pic}
            image={pic}
            sx={{
              width: 64,
              height: 64,
              cursor: 'pointer',
              ...activeStyle,
            }}
            onClick={() => {
              setCurrent(index);
            }}
          />
        );
      })}
    </Box>
  );
};

export default Nav;
