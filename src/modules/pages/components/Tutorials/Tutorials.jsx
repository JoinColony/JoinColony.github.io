/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages } from 'react-intl';

import { graphql, useStaticQuery } from 'gatsby';

import type { TutorialNode } from '~types';

import Heading from '~core/Heading';
import Link from '~core/Link';
import Search from '~core/Search';

const MSG = defineMessages({
  pageTitle: {
    id: 'pages.Tutorials.pageTitle',
    defaultMessage: 'Explore Tutorials',
  },
  pageSubtitle: {
    id: 'pages.Tutorials.pageSubtitle',
    defaultMessage: 'Tutorials',
  },
});

type QueryData = {
  allTutorials: {
    edges: Array<{
      node: TutorialNode,
    }>,
  },
};

type Props = {|
  /** Injected via `injectIntl` */
  intl: IntlShape,
|};

const displayName = 'pages.Tutorials';

const Tutorials = () => {
  const tutorialsQueryData: QueryData = useStaticQuery(graphql`
    {
      ...allTutorialsFragment
    }
  `);
  return (
    <>
      <Heading text={MSG.pageTitle} />
      <Search inputId="pagesTutorialsSearch" />
      <Heading text={MSG.pageSubtitle} />
      {tutorialsQueryData.allTutorials.edges.map(
        ({
          node: {
            fields: { slug },
            name,
          },
        }) => (
          <Link href={slug}>
            <Heading text={name} />
          </Link>
        ),
      )}
    </>
  );
};

Tutorials.displayName = displayName;

export default Tutorials;
