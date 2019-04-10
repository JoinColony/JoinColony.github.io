/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';

import styles from './OpenSourceItem.module.css';

const MSG = defineMessages({
  docsLinkText: {
    id: 'pages.Developers.OpenSourceItem.docsLinkText',
    defaultMessage: 'Docs',
  },
});

type Props = {|
  project: Project,
|};

const displayName = 'pages.Developers.OpenSourceItem';

const OpenSourceItem = ({
  project: { description, entryPoint, logoSmall, name, repoUrl },
}: Props) => (
  <div className={styles.main}>
    <div className={styles.imageContainer}>
      <Image
        alt={name}
        className={styles.image}
        project={name}
        src={logoSmall}
      />
    </div>
    <div className={styles.contentContainer}>
      <div>
        <Heading
          appearance={{
            margin: 'none',
            size: 'medium',
            theme: 'invert',
            weight: 'medium',
          }}
          text={name}
        />
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.linkContainer}>
        <p>
          <Link
            className={styles.itemLink}
            href={entryPoint}
            text={MSG.docsLinkText}
          />
          <Link
            arrow="right"
            className={styles.itemLink}
            href={repoUrl}
            text="GitHub"
          />
        </p>
      </div>
    </div>
  </div>
);

OpenSourceItem.displayName = displayName;

export default OpenSourceItem;
