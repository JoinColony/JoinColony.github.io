/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import type { Project } from '~types';

import SectionListItem from '~pages/DocPage/SectionListItem';
import { getSectionsForLocale } from '~utils/docs';

import styles from './SectionList.module.css';

type Props = {|
  /* Injected via `injectIntl` */
  intl: IntlShape,
  project: Project,
|};

const displayName = 'pages.DocPage.SectionList';

const SectionList = ({ intl: { locale }, project }: Props) => (
  <ul className={styles.sectionsList}>
    {getSectionsForLocale(project, locale).map(section => (
      <SectionListItem key={section.slug} locale={locale} section={section} />
    ))}
  </ul>
);

SectionList.displayName = displayName;

export default injectIntl(SectionList);
