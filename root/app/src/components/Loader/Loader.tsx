import { memo, ReactElement, useEffect, useState } from "react";

import { DOT, DOTS_MAX_LENGTH, DOTS_APPENDING_DELAY } from './Loader.constants';
import { LoaderStyled } from './Loader.styles';

const Loader = (): ReactElement => {
  const [loader, setLoader] = useState<string>(DOT);

  useEffect(() => {
    let dots = loader;

    const loadingInterval = setInterval(() => {
      if (dots.length < DOTS_MAX_LENGTH) {
        dots += DOT;
      } else {
        dots = DOT;
      }

      setLoader(dots);
    }, DOTS_APPENDING_DELAY);

    return () => clearInterval(loadingInterval);
  }, []);

  return (
    <LoaderStyled>{loader}</LoaderStyled>
  )
}

export default memo(Loader);