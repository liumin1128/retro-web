import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Item from '@/components/Retro/Item';

const user = {
  avatar: 'http://',
  nickname: '本王今年八岁',
};

const Section: React.FunctionComponent = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={4} sx={{ mt: 10 }}>
          <Grid item xs={4}>
            <Item user={user} content="xxxxx">
              1
            </Item>
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
