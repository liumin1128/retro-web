import React from 'react';
import LogoAnimation from '@/components/Icon/LoadingCat';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LogoAnimation sx={{ width: 100, height: 100 }} />
    </div>
  );
};

export default Loading;
