/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import type { Project } from '~types';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';

import styles from './CoreProductsItem.module.css';

const MSG = defineMessages({
  docsLinkText: {
    id: 'pages.Developers.CoreProductsItem.docsLinkText',
    defaultMessage: 'Docs',
  },
});

type Props = {|
  project: Project,
|};

const displayName = 'pages.Developers.CoreProductsItem';

const CoreProductsItem = ({
  project: { description, entryPoint, logoSmall, name, repoUrl },
}: Props) => (
  <>
    <div>
      <div className={styles.imageContainer}>
        <Image
          alt={name}
          className={styles.image}
          project={name}
          src={logoSmall}
        />
      </div>
      <Heading
        appearance={{ theme: 'invert', size: 'medium', weight: 'medium' }}
        text={name}
      />
      <p>{description}</p>
    </div>
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
  </>
);

CoreProductsItem.displayName = displayName;

export default CoreProductsItem;
