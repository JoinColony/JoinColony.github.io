/* @flow */
import type { Node } from 'react';
import type { IntlShape } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';
import { StaticQuery, graphql } from 'gatsby';
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css';

import BugBounty from '~parts/BugBounty';
import Header from '~parts/Header';
import Footer from '~parts/Footer';
import { transformProjectData } from '~utils/docs';

import '~styles/normalize.css';
import '~styles/fonts.css';
import '~styles/syntax-hightlight.css';
import styles from './MainLayout.module.css';

type Props = {|
  children: Node,
  intl: IntlShape,
|};

const displayName = 'layouts.MainLayout';

const MainLayout = ({ children, intl: { locale } }: Props) => {
  return (
    <StaticQuery
      query={graphql`
        query AllProjectQuery {
          projects: allProject {
            edges {
              node {
                name
                slug
                logo
                logoSmall
                description
                sections {
                  slug
                  docs {
                    id
                    fields {
                      locale
                      slug
                    }
                    frontmatter {
                      order
                      section
                    }
                  }
                }
                sectionOrder
              }
            }
          }
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

MainLayout.displayName = displayName;

export default injectIntl(MainLayout);
