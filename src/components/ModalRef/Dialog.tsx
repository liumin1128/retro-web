import {
  useState,
  useImperativeHandle,
  forwardRef,
  ElementType,
  ForwardedRef,
  ReactChildren,
  ReactNode,
} from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import isEmpty from 'lodash/isEmpty';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps extends Omit<DialogProps, 'open'> {
  component?: ElementType;
  render?: (props?: Record<string, unknown>) => ReactNode;
  children?: ReactChildren;
  title?: string;
  onOk?: () => void;
}

export interface ModalRefInstance<T> {
  open: (props?: T) => void;
  close: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ModalRef = forwardRef(
  (modalProps: ModalProps, ref: ForwardedRef<unknown>) => {
    const [visible, setVisible] = useState(false);
    const [props, setProps] = useState({});

    const handleClose = () => {
      setVisible(false);
    };

    const handleOpen = (args: Record<string, unknown>) => {
      setVisible(true);
      if (!isEmpty(args)) {
        setProps(args);
      }
    };

    useImperativeHandle(ref, () => ({
      open: handleOpen,
      close: handleClose,
    }));

    const {
      component: Component,
      render,
      children,
      title,
      onOk,
      ...other
    } = modalProps;

    return (
      <BootstrapDialog {...other} onClose={handleClose} open={visible}>
        {title && (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
        )}

        <DialogContent dividers>
          {children}
          {Component && <Component {...props} />}
          {render && render(props)}
        </DialogContent>

        {onOk && (
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                if (onOk) onOk();
              }}
              variant="contained"
            >
              OK
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    );
  },
);

export default ModalRef;

/* example

import ModalRef, { ModalRefInstance } from '@/components/ModalRef';

const ref = useRef<ModalRefInstance<unknown>>();

<ModalRef
  ref={ref}
  render={() => {
    return <>hello</>;
  }}
/>

ref.current?.open();

*/
