import * as React from 'react';
import Popover, { PopoverProps } from '@mui/material/Popover';
import ButtonBase from '@mui/material/ButtonBase';

interface Props extends PopoverProps {
  render?: () => React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
}

export default function BasicPopover({ children, render, ...other }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <ButtonBase aria-describedby={id} onClick={handleClick}>
        {children}
      </ButtonBase>
      <Popover
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...other}
        open={open}
      >
        {render && render()}
      </Popover>
    </div>
  );
}
