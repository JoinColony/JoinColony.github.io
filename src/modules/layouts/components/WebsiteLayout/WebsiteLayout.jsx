/* @flow */

import type { Element } from 'react';

import React, { Component, useCallback, useState, useEffect, useLayoutEffect, useRef } from 'react';

import ThemeContext from './context';
import Footer from './Footer';
import Header from './Header';

import styles from './WebsiteLayout.module.css';

type Props = {|
  children: Element<typeof Component>,
  transparentNav?: boolean,
|};

const displayName = 'layouts.WebsiteLayout';

const WebsiteLayout = ({ children, transparentNav = false }: Props) => {
  const [height, _setHeight] = useState(0);
  const ref: { current: null | HTMLDivElement } = useRef(null);

  const setHeight = useCallback(() => {
    if (ref.current) {
      _setHeight(ref.current.clientHeight);
    }
  }, []);

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

  return (
    <ThemeContext.Provider value={{ headerHeight: height }}>
      <div className={transparentNav ? styles.transparentNav : null} ref={ref}>
        <Header
          appearance={{ theme: transparentNav ? 'transparent' : 'light' }}
        />
      </div>
      {children}
      <Footer />
    </ThemeContext.Provider>
  );
};

WebsiteLayout.displayName = displayName;

export default WebsiteLayout;
