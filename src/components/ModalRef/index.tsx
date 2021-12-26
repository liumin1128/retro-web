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

export interface ModalProps extends Omit<DialogProps, 'open'> {
  component?: ElementType;
  render?: (props?: Record<string, unknown>) => ReactNode;
  children?: ReactChildren;
}

export interface ModalRefInstance<T> {
  open: (props?: T) => void;
  close: () => void;
}

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

    const { component: Component, render, children, ...other } = modalProps;

    return (
      <Dialog {...other} onClose={handleClose} open={visible}>
        {children}
        {Component && <Component {...props} />}
        {render && render(props)}
      </Dialog>
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
