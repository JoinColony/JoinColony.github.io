/* @flow */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import MainLayout from '~layouts/MainLayout';
import { orderSections, orderDocs } from '~utils/docs';

import HomePageContent from '~parts/HomePageContent';

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

const displayName = 'pages.HomePage';

const HomePage = () => {
  return (
    <MainLayout>
      <StaticQuery
        query={graphql`
          {
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
          return <HomePageContent projects={projects} />;
        }}
      />
    </MainLayout>
  );
};

HomePage.displayName = displayName;

export default HomePage;
