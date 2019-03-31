/* @flow */
import React, { createElement } from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import { withProps } from 'recompose';

import type { Tutorial } from '~types';
import type { Appearance as HeadingAppearance } from '~core/Heading';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';

type Props = {|
  data: {
    tutorial: Tutorial,
  },
|};

const commonHeadingAppearanceProps: HeadingAppearance = {
  margin: 'none',
  theme: 'dark',
  weight: 'thin',
};

const headingWithSize = (size: string) =>
  withProps({
    appearance: { ...commonHeadingAppearanceProps, size },
  })(Heading);

const displayName = 'pages.TutorialPage';

const TutorialPage = ({
  data: {
    tutorial: {
      name,
      frontmatter: { author, title },
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
      h1: headingWithSize('huge'),
      h2: headingWithSize('large'),
      h3: headingWithSize('medium'),
      h4: headingWithSize('normal'),
      h5: headingWithSize('small'),
      h6: headingWithSize('tiny'),
      img: withProps({ project: name })(Image),
    },
  }).Compiler;
  const tutorialContent = renderAst(htmlAst);
  return (
    <DeveloperPortalLayout>
      <Heading appearance={{ weight: 'medium' }} text={title} />
      <Heading
        appearance={{ ...commonHeadingAppearanceProps, size: 'small' }}
        text={author}
      />
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
