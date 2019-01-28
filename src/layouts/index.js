/* @flow */
import type { Node } from 'react';

import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css';

import './normalize.css';
import './fonts.css';
import './syntax-hightlight.css';
import styles from './index.module.css';

import { orderSections, orderDocs } from '../utils';
import FileContext from '../contexts/FileContext';

import BugBounty from '../components/BugBounty'; /* BUG BOUNTY */

import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
  children: Node,
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
              {children}
              <Footer projects={projects} />
            </FileContext.Provider>
          </div>
        );
      }}
    />
  );
};

export default MainLayout;

const getEntryPoint = project => {
  const firstSection = project.sections.sort((a, b) =>
    orderSections(project.sectionOrder, a, b),
  )[0];
  const firstDoc = firstSection.docs.sort(orderDocs)[0];
  return `${firstSection.slug}-${firstDoc.slug}`;
};

const getFileMapping = files => {
  return files.reduce((current, next) => {
    current[`${next.node.sourceInstanceName}/${next.node.relativePath}`] =
      next.node.publicURL;
    return current;
  }, {});
};

const transformProjectData = edge => {
  edge.node.entryPoint = getEntryPoint(edge.node);
  return edge.node;
};
