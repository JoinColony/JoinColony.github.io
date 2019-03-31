/* @flow */
import React from 'react';
import { graphql } from 'gatsby';

const displayName = 'pages.TutorialPage';

const TutorialPage = () => <div />;

TutorialPage.displayName = displayName;

export const pageQuery = graphql`
  query tutorialQuery($tutorialId: String!) {
    ...singleTutorialFragment
  }
`;

export default TutorialPage;
