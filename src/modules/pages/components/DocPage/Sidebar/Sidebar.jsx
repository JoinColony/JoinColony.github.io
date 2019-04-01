/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Link from '~core/Link';
import SectionList from '~pages/DocPage/SectionList';
import { PAGE_DEVELOPER_PORTAL } from '~routes';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  linkHome: {
    id: 'parts.Sidebar.linkHome',
    defaultMessage: 'Home',
  },
  btnBackToTop: {
    id: 'parts.Sidebar.btnBackToTop',
    defaultMessage: 'Back to Top',
  },
});

type Props = {|
  project: Project,
|};

const displayName = 'parts.Sidebar';

const Sidebar = ({ project: { name: projectName }, project }: Props) => (
  <nav className={styles.main}>
    <Link
      arrow="left"
      className={styles.homeLink}
      href={PAGE_DEVELOPER_PORTAL}
      text={MSG.linkHome}
    />
    <div className={styles.projectTitle}>
      <Heading
        appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'medium' }}
        text={projectName}
      />
    </div>
    <SectionList project={project} />
    <div className={styles.backToTop}>
      <Button
        className={styles.itemLink}
        onClick={handleBackToTop}
        text={MSG.btnBackToTop}
      />
    </div>
  </nav>
);

Sidebar.displayName = displayName;

function handleBackToTop(e) {
  if (typeof window !== 'undefined') {
    e.preventDefault();
    window.scrollTo(0, 0);
  }
}

export default Sidebar;
