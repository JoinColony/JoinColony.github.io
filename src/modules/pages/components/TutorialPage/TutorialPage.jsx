/* @flow */
import React, { createElement } from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import { withProps } from 'recompose';

import type { Tutorial } from '~types';

import Image from '~core/Image';
import Link from '~core/Link';
import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';

type Props = {|
  data: {
    tutorial: Tutorial,
  },
|};

const displayName = 'pages.TutorialPage';

const TutorialPage = ({
  data: {
    tutorial: {
      name,
      frontmatter: { title },
      htmlAst,
    },
  },
}: Props) => {
  const renderAst = new RehypeReact({
    createElement,
    components: {
      a: withProps({
        // @TODO handle i18n / transforming internalUrls
        // transformUrl: this.transformInternalUrls,
        persistLocale: false,
      })(Link),
      img: withProps({ project: name })(Image),
    },
  }).Compiler;
  const tutorialContent = renderAst(htmlAst);
  return (
    <DeveloperPortalLayout>
      <h1>{title}</h1>
      {tutorialContent}
    </DeveloperPortalLayout>
  );
};

TutorialPage.displayName = displayName;

export const pageQuery = graphql`
  query tutorialQuery($tutorialId: String!) {
    ...singleTutorialFragment
  }
`;

export default TutorialPage;
