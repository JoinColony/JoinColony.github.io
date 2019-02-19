/* @flow */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import MainLayout from '~layouts/MainLayout';

import HomePageContent from '~parts/HomePageContent';

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
          return <HomePageContent projects={data.projects.edges} />;
        }}
      />
    </MainLayout>
  );
};

HomePage.displayName = displayName;

export default HomePage;
