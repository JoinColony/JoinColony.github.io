/* @flow */
import type { Node } from 'react';

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css';

import { orderSections, orderDocs } from '~utils/docs';

import GlobalLayout from '~layouts/GlobalLayout';
import BugBounty from '~parts/BugBounty';
import Header from '~parts/Header';
import Footer from '~parts/Footer';

import '~styles/normalize.css';
import '~styles/fonts.css';
import '~styles/syntax-hightlight.css';
import styles from './MainLayout.module.css';

type Props = {
  children: Node,
};

const getEntryPoint = project => {
  const firstSection = project.sections.sort((a, b) =>
    orderSections(project.sectionOrder, a, b),
  )[0];
  const firstDoc = firstSection.docs.sort(orderDocs)[0];
  return `${firstSection.slug}-${firstDoc.slug}`;
};

const transformProjectData = edge => {
  const edgeNode = edge.node;
  edgeNode.entryPoint = getEntryPoint(edge.node);
  return edgeNode;
};

const displayName = 'layouts.MainLayout';

const MainLayout = ({ children }: Props) => {
  return (
    <GlobalLayout>
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
                      slug
                      frontmatter {
                        order
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
          const projects = data.projects.edges.map(transformProjectData) || [];
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
    </GlobalLayout>
  );
};

MainLayout.displayName = displayName;

export default MainLayout;
