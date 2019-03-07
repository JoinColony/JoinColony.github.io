/* @flow */
import type { Node } from 'react';
import type { IntlShape } from 'react-intl';

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import BugBounty from '~parts/BugBounty';
import Header from './Header';
import Footer from './Footer';
import { transformProjectData } from '~utils/docs';

import styles from './DeveloperPortalLayout.module.css';

type Props = {|
  children: Node,
  intl: IntlShape,
|};

const displayName = 'layouts.DeveloperPortalLayout';

const DeveloperPortalLayout = ({ children, intl: { locale } }: Props) => {
  return (
    <StaticQuery
      query={graphql`
        {
          ...allProjectsFragment
        }
      `}
      render={data => {
        const projects =
          data.projects.edges.map(edge => transformProjectData(edge, locale)) ||
          [];
        return (
          <div className={styles.gridContainer}>
            <BugBounty /> {/* BUG BOUNTY */}
            <Header projects={projects} />
            {children}
            <Footer projects={projects} />
          </div>
        );
      }}
    />
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
