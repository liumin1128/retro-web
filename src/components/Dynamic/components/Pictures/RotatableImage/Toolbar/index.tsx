import React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

interface IToolbarProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onView: () => void;
  onClose: () => void;
}

const Toolbar: React.FunctionComponent<IToolbarProps> = (props) => {
  const { onClose, onView, onRotateLeft, onRotateRight } = props;
  return (
    <Box
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'row',
        color: '#666',
      }}
    >
      <ButtonBase sx={{ p: 1, px: 2 }} onClick={onClose}>
        <FullscreenExitIcon />
        收起
      </ButtonBase>
      <ButtonBase sx={{ p: 1, px: 2 }} onClick={onView}>
        <SearchIcon />
        查看原图
      </ButtonBase>
      <ButtonBase sx={{ p: 1, px: 2 }} onClick={onRotateLeft}>
        <RotateLeftIcon />
        向左旋转
      </ButtonBase>
      <ButtonBase sx={{ p: 1, px: 2 }} onClick={onRotateRight}>
        <RotateRightIcon />
        向右旋转
      </ButtonBase>
    </Box>
  );
};

export default Toolbar;
