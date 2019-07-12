/* @flow */

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const useElementHeight = (ref: { current: null | Element }): number => {
  const [height, _setHeight] = useState(0);

  const setHeight = useCallback(() => {
    if (ref.current) {
      let elementHeight = 0;
      if (ref.current.nodeName === 'path') {
        // determine height of an svg path
        elementHeight = ref.current.getBoundingClientRect().height;
      } else {
        elementHeight = ref.current.clientHeight;
      }
      _setHeight(elementHeight);
    }
  }, [ref]);

  // set once window has loaded
  useLayoutEffect(() => {
    setHeight();
  }, [setHeight]);

  // update on resize
  useEffect(() => {
    const handleResize = () => setHeight();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return height;
};

export default useElementHeight;
