import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
} from 'react';

interface WithComonentProps {}

interface WithComonentRef {}

const withPropsAndRef = <TProps extends WithComonentProps>(
  WrappedComponent: ForwardRefRenderFunction<WithComonentRef, TProps>,
  InjectProps?: Record<string, unknown>,
) => {
  const WithComonent = (props: TProps, ref: React.Ref<WithComonentRef>) => {
    const componentRef = useRef<unknown>(null);
    useImperativeHandle(ref, () => ({}));
    return (
      <WrappedComponent
        ref={ref}
        forwardedRef={componentRef}
        {...props}
        {...InjectProps}
      />
    );
  };
  return forwardRef(WithComonent);
};

export default withPropsAndRef;
