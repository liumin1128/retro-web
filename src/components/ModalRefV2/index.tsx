import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { Ref, forwardRef, useImperativeHandle, useState } from 'react';

export interface ModalProps extends Omit<DialogProps, 'open'> {
  title?: string;
  content?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void;
  render?: (props: unknown) => React.ReactNode;
}

export interface ModalMethods {
  open: (injectProps?: ModalProps) => void;
  close: () => void;
}

export default forwardRef((props: ModalProps, ref: Ref<ModalMethods>) => {
  const [open, setOpen] = useState(false);
  const [injectProps, setInjectProps] = useState<ModalProps>({});

  const {
    children,
    title,
    content,
    showCancel = true,
    showConfirm = true,
    onConfirm,
    render,
    ...otherProps
  } = { ...props, ...injectProps };

  const handleCancel = () => {
    setOpen(false);
    setInjectProps({});
  };

  const handleConfirm = async () => {
    // 如果存在注入方法，则执行注入方法

    try {
      if (onConfirm) {
        await onConfirm();
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useImperativeHandle(ref, () => ({
    open: (op?: ModalProps) => {
      setOpen(true);
      if (op) {
        setInjectProps(op);
      }
    },
    close: () => {
      handleCancel();
    },
  }));

  return (
    <Dialog onClose={handleCancel} {...otherProps} open={open}>
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
      )}

      {children}

      {render && <DialogContent>{render(injectProps)}</DialogContent>}

      {showConfirm && showCancel && (
        <DialogActions>
          {showCancel && <Button onClick={handleCancel}>Cancel</Button>}
          {showConfirm && (
            <Button onClick={handleConfirm} autoFocus>
              Confirm
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
});
