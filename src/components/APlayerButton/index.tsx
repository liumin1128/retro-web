// https://zhuanlan.zhihu.com/p/538567487
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import APlayer from '@/components/APlayer';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const APlayerRoot = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MusicNoteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClick} fullWidth>
        <APlayer />
      </Dialog>
    </div>
  );
};

export default APlayerRoot;
