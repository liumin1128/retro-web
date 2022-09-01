import React, { useRef, useEffect } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import lottie from 'lottie-web';

interface ILottieProps extends StackProps {
  path: string;
  loop?: boolean;
  autoplay?: boolean;
}

const Lottie: React.FunctionComponent<ILottieProps> = (props) => {
  const { path, loop = true, autoplay = true, ...other } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: ref.current as HTMLDivElement, // the dom element that will contain the animation
      renderer: 'svg',
      loop,
      autoplay,
      path,
    });
    return () => {
      lottie.destroy();
    };
  }, [path, loop, autoplay]);

  return <Stack ref={ref} {...other} />;
};

export default Lottie;
