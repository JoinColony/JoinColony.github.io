/* @flow */

import React from 'react';

import Link from '~core/Link';

import type { DropdownNavItem } from './types';

import styles from './DropdownContentMobile.module.css';

type Props = {|
  isExpanded: boolean,
  navItems: Array<DropdownNavItem>,
|};

const displayName = 'layouts.WebsiteLayout.Header.DropdownContentMobile';

const DropdownContentMobile = ({ isExpanded, navItems }: Props) => (
  <div aria-expanded={isExpanded} className={styles.main}>
    <div className={styles.content}>
      {navItems.map(({ href, title }) => (
        <Link
          className={styles.dropdownLink}
          href={href}
          key={href}
          text={title}
        />
      ))}
    </div>
  </div>
);

DropdownContentMobile.displayName = displayName;

export default DropdownContentMobile;
