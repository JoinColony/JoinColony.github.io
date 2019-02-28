/* @flow */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import type { Project } from '~types';

import MainLayout from '~layouts/MainLayout';
import HomePageContent from '~parts/HomePageContent';

type QueryData = {
  projects: {
    edges: Array<Project>,
  },
};

const displayName = 'pages.HomePage';

const HomePage = () => {
  return (
    <MainLayout>
      <StaticQuery
        query={graphql`
          {
            ...allProjectsFragment
          }
        `}
        render={(data: QueryData) => {
          return <HomePageContent projects={data.projects.edges} />;
        }}
      />
    </MainLayout>
  );
};

HomePage.displayName = displayName;

export default HomePage;
