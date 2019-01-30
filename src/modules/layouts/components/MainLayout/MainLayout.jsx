/* @flow */
import type { Node } from 'react';

import React, { Children, cloneElement } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css';

import '~styles/normalize.css';
import '~styles/fonts.css';
import '~styles/syntax-hightlight.css';
import styles from './MainLayout.module.css';

import { orderSections, orderDocs } from '~utils';
import FileContext from '~context/FileContext';

import BugBounty from '~parts/BugBounty';
import Header from '~parts/Header';
import Footer from '~parts/Footer';

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

const getFileMapping = files => {
  return files.reduce((current, next) => {
    // eslint-disable-next-line no-param-reassign
    current[`${next.node.sourceInstanceName}/${next.node.relativePath}`] =
      next.node.publicURL;
    return current;
  }, {});
};

const transformProjectData = edge => {
  const edgeNode = edge.node;
  edgeNode.entryPoint = getEntryPoint(edge.node);
  return edgeNode;
};

const MainLayout = ({ children }: Props) => {
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
          files: allFile {
            edges {
              node {
                sourceInstanceName
                relativePath
                publicURL
              }
            }
          }
        }
      `}
      render={data => {
        const projects = data.projects.edges.map(transformProjectData) || [];
        const childrenWithProps = Children.map(children, child =>
          cloneElement(child, { projects }),
        );
        return (
          <div className={styles.gridContainer}>
            <Helmet>
              <link
                rel="shortcut icon"
                type="image/png"
                href={withPrefix('/img/favicon.ico')}
              />
              <script src={withPrefix('/js/fontloader.js')} />
            </Helmet>
            <FileContext.Provider value={getFileMapping(data.files.edges)}>
              <BugBounty /> {/* BUG BOUNTY */}
              <Header projects={projects} />
              {childrenWithProps}
              <Footer projects={projects} />
            </FileContext.Provider>
          </div>
        );
      }}
    />
  );
};

export default MainLayout;
