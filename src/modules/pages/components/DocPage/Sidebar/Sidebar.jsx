/* @flow */
import React, { createElement } from 'react';
import { defineMessages } from 'react-intl';
import { Match } from '@reach/router';
import RehypeReact from 'rehype-react';

import type { Project, HtmlAst } from '~types';

import Button from '~core/Button';
import Heading from '~core/Heading';
import Link from '~core/Link';
import SectionList from '~pages/DocPage/SectionList';
import { PAGE_DEVELOPER_PORTAL } from '~routes';
import { getMainClasses } from '~utils/css';

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
  locationState: {
    fromChild: boolean,
    fromParent: boolean,
    key: string,
  },
  project: Project,
  projectEntryPoint: string,
  tableOfContents: HtmlAst,
|};

const renderAst = new RehypeReact({
  createElement,
  components: {
    a: Link,
  },
}).Compiler;

const displayName = 'parts.Sidebar';

const Sidebar = ({
  locationState: { fromChild, fromParent },
  project: { name: projectName },
  project,
  projectEntryPoint,
  tableOfContents,
}: Props) => (
  <nav
    className={getMainClasses({}, styles, {
      fromChild,
      fromParent,
    })}
  >
    <div className={styles.menuContentsWrapper}>
      <div className={styles.menuContents}>
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
                  state={{ fromChild: true }}
                  text={projectName}
                />
                {renderAst(tableOfContents)}
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
      </div>
    </div>
  </nav>
);

Sidebar.displayName = displayName;

function handleBackToTop(e) {
  if (typeof window !== 'undefined') {
    e.preventDefault();
    window.scrollTo(0, 0);
  }
}

export default Sidebar;
