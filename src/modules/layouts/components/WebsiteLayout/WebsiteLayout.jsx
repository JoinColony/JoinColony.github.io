/* @flow */

import type { Element } from 'react';

import React, { Component, useRef } from 'react';

import ThemeContext from './context';
import Footer from './Footer';
import Header from './Header';
import { useElementHeight } from '../../../core/hooks';

import styles from './WebsiteLayout.module.css';

type Props = {|
  children: Element<typeof Component>,
  transparentNav?: boolean,
|};

const displayName = 'layouts.WebsiteLayout';

const WebsiteLayout = ({ children, transparentNav = false }: Props) => {
  const ref = useRef(null);
  const height = useElementHeight(ref);
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
