/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React, { useContext } from 'react';

import Link from '~core/Link';
import ThemeContext from '~layouts/WebsiteLayout/context';

import styles from './Sidebar.module.css';

type Props = {|
  links: Array<{
    href: string,
    text: MessageDescriptor,
  }>,
|};

const displayName = 'pages.Website.Terms.Sidebar';

const Sidebar = ({ links }: Props) => {
  const { headerHeight } = useContext(ThemeContext);
  return (
    <nav
      className={styles.sidebarContent}
      style={{ top: `${headerHeight + 20}px` }}
    >
      {links.map(({ href, text }) => (
        <Link className={styles.link} href={href} key={href} text={text} />
      ))}
    </nav>
  );
};

Sidebar.displayName = displayName;

export default Sidebar;
