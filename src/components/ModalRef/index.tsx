import {
  useState,
  useImperativeHandle,
  forwardRef,
  ElementType,
  ForwardedRef,
} from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import isEmpty from 'lodash/isEmpty';

interface Props extends DialogProps {
  component: ElementType;
}

export interface ModalWrapperInstance<T> {
  open: (props?: T) => void;
  close: () => void;
}

const ModalWrapper = forwardRef((props: Props, ref: ForwardedRef<unknown>) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = (args: Record<string, unknown>) => {
    setVisible(true);
    if (!isEmpty(args)) {
      setData(args);
    }
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const { component: Component, ...other } = props;

  return (
    <Dialog {...other} onClose={handleClose} open={visible}>
      <Component {...data} />
    </Dialog>
  );
});

export default ModalWrapper;
