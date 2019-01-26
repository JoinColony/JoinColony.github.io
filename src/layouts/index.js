import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { withPrefix } from 'gatsby-link';
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

const MainLayout = props => {
  const { children } = props;
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
        const childrenWithProps = Children.map(children.children, child =>
          cloneElement(child, { ...props, projects })
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

MainLayout.propTypes = {
  children: PropTypes.func,
};

export default MainLayout;

function getFileMapping(files) {
  return files.reduce((current, next) => {
    current[`${next.node.sourceInstanceName}/${next.node.relativePath}`] =
      next.node.publicURL;
    return current;
  }, {});
}

function transformProjectData(edge) {
  edge.node.entryPoint = getEntryPoint(edge.node);
  return edge.node;
}

function getEntryPoint(project) {
  const firstSection = project.sections.sort((a, b) =>
    orderSections(project.sectionOrder, a, b)
  )[0];
  const firstDoc = firstSection.docs.sort(orderDocs)[0];
  return `${firstSection.slug}-${firstDoc.slug}`;
}
