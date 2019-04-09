/* @flow */
import type { IntlShape } from 'react-intl';

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Match } from '@reach/router';

import type { Project } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Link from '~core/Link';
import SectionList from '~pages/DocPage/SectionList';
import { PAGE_DEVELOPER_PORTAL } from '~routes';
import { getProjectEntryPoint } from '~utils/docs';
import { fixTocCodeTag } from '~utils/toc';

import styles from './Sidebar.module.css';

const MSG = defineMessages({
  linkHome: {
    id: 'parts.Sidebar.linkHome',
    defaultMessage: 'Home',
  },
  btnBackToTop: {
    id: 'parts.Sidebar.btnBackToTop',
    defaultMessage: 'Back to Top',
  },
});

type Props = {|
  intl: IntlShape,
  project: Project,
  tableOfContents: string,
|};

const displayName = 'parts.Sidebar';

const Sidebar = ({
  intl: { locale },
  project: { name: projectName },
  project,
  tableOfContents: unsanitizedToc,
}: Props) => {
  const projectEntryPoint = getProjectEntryPoint(project, locale);
  const tableOfContents = fixTocCodeTag(unsanitizedToc);
  return (
    <nav className={styles.main}>
      <Match path={projectEntryPoint}>
        {({ match }) =>
          match ? (
            <>
              <Link
                arrow="left"
                className={styles.homeLink}
                href={PAGE_DEVELOPER_PORTAL}
                text={MSG.linkHome}
              />
              <div className={styles.projectTitle}>
                <Heading
                  appearance={{
                    size: 'mediumLarge',
                    theme: 'dark',
                    weight: 'medium',
                  }}
                  text={projectName}
                />
              </div>
              <SectionList project={project} />
            </>
          ) : (
            <>
              <Link
                arrow="left"
                className={styles.homeLink}
                href={projectEntryPoint}
                text={projectName}
              />
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
            </>
          )
        }
      </Match>
      <div className={styles.backToTop}>
        <Button
          className={styles.itemLink}
          onClick={handleBackToTop}
          text={MSG.btnBackToTop}
        />
      </div>
    </nav>
  );
};

Sidebar.displayName = displayName;

function handleBackToTop(e) {
  if (typeof window !== 'undefined') {
    e.preventDefault();
    window.scrollTo(0, 0);
  }
}

export default injectIntl(Sidebar);
