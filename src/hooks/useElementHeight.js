/* @flow */

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const useElementHeight = (ref: { current: null | Element }): number => {
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(() => {
    if (ref.current) {
      let elementHeight = 0;
      if (ref.current.nodeName === 'path') {
        // determine height of an svg path
        elementHeight = ref.current.getBoundingClientRect().height;
      } else {
        elementHeight = ref.current.clientHeight;
      }
      setHeight(elementHeight);
    }
  }, [ref]);

  // set once window has loaded
  useLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  // update on resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return height;
};

export default useElementHeight;
