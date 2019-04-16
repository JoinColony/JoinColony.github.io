/* @flow */
import type { Node } from 'react';
import type { IntlShape } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';
import { Match } from '@reach/router';

import type { Doc, Project } from '~types';
import type { Appearance as HeadingAppearance } from '~core/Heading';

import Heading from '~core/Heading';
import Image from '~core/Image';
import { getProjectEntryPoint } from '~utils/docs';

import styles from './Content.module.css';

type Props = {|
  children?: Node,
  commonHeadingAppearanceProps: HeadingAppearance,
  doc: Doc,
  /** Injected via `injectIntl` */
  intl: IntlShape,
  project: Project,
|};

const displayName = 'pages.DocPage.Content';

const Content = ({
  children,
  commonHeadingAppearanceProps,
  doc,
  intl: { locale },
  project,
}: Props) => (
  <>
    <Match path={getProjectEntryPoint(project, locale)}>
      {({ match }) =>
        match ? (
          <div className={styles.imageWrapper}>
            <div className={styles.mainImage}>
              <Image
                alt={project.name}
                project={project.name}
                src={project.logoSmall}
              />
              <Heading
                appearance={{ margin: 'none', theme: 'dark' }}
                text={project.name}
              />
            </div>
          </div>
        ) : null
      }
    </Match>
    <div className={styles.astContent}>
      <Heading
        appearance={{
          ...commonHeadingAppearanceProps,
          size: 'large',
        }}
        text={doc.frontmatter.title}
      />
      {children}
    </div>
  </>
);

Content.displayName = displayName;

export default injectIntl(Content);
