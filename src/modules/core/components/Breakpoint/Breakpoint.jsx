/* @flow */

import type { Node } from 'react';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

type Props = {|
  /** Children to be rendered when viewport the correct size */
  children: Node,
  /** Relative to the specified `size` */
  inclusion?: 'down' | 'up' | 'only',
  /** Size to show `children` */
  size: 'small' | 'medium' | 'large',
|};

const displayName = 'Breakpoint';

const Breakpoint = ({ children, inclusion = 'up', size: sizeProp }: Props) => {
  const [windowSize, setWindowSize] = useState(0);

  const breakpoints = {
    small: 480,
    medium: 850,
    large: 1440,
  };

  const size = inclusion === 'down' ? 0 : breakpoints[sizeProp];

  const getSize = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  }, []);

  const handleResize = useCallback(() => {
    setWindowSize(getSize());
  }, [getSize]);

  useLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const getNextBreakpoint = useCallback(() => {
    const breakpointKeys = Object.keys(breakpoints);
    const nextBreakpointKey =
      breakpointKeys[breakpointKeys.indexOf(sizeProp) + 1];
    switch (inclusion) {
      case 'down':
        return nextBreakpointKey
          ? breakpoints[nextBreakpointKey] - 1
          : Infinity;
      case 'only':
        return nextBreakpointKey ? breakpoints[nextBreakpointKey] : Infinity;
      default:
        return Infinity;
    }
  }, [breakpoints, inclusion, sizeProp]);

  const shouldShow: boolean = useMemo(() => {
    const nextBreakpoint = getNextBreakpoint();
    return windowSize > size && windowSize < nextBreakpoint;
  }, [getNextBreakpoint, size, windowSize]);

  return shouldShow ? children : null;
};

Breakpoint.displayName = displayName;

export default Breakpoint;
