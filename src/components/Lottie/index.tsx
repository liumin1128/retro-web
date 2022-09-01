import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface ILottieProps {
  path: string;
}

const Lottie: React.FunctionComponent<ILottieProps> = (props) => {
  const { path } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: ref.current as HTMLDivElement, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path,
    });
  }, [path]);

  return <div ref={ref} />;
};

export default Lottie;
