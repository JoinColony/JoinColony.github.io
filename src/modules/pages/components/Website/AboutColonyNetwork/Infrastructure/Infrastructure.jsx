/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';

import styles from './Infrastructure.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.body',
    defaultMessage: `The Colony Network is a cryptoeconomic protocol:
      software secured by economic incentives, guaranteed by
      cryptography, running on a public blockchain.
      {br}{br}
      The Colony Network is:`,
  },
  bodyModular: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.bodyModular',
    defaultMessage: `Colony is modular and extensible, allowing
      developers to create modules which enable desired functionality.`,
  },
  bodyPermissionless: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.bodyPermissionless',
    defaultMessage: `Anyone may create and operate a colony without
      possibility of censorship or third party interference.`,
  },
  bodySelfSovereign: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.bodySelfSovereign',
    defaultMessage: `Your colony is your own, it cannot be taken away
      from you, nor the functionality changed without your permission.`,
  },
  title: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.title',
    defaultMessage: 'Infrastructure for the Future of the Firm',
  },
  titleModular: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.titleModular',
    defaultMessage: 'Modular',
  },
  titlePermissionless: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.titlePermissionless',
    defaultMessage: 'Permissionless',
  },
  titleSelfSovereign: {
    id: 'pages.Website.AboutColonyNetwork.Infrastructure.titleSelfSovereign',
    defaultMessage: 'Self-sovereign',
  },
});

const GridItem = ({
  body,
  image,
  title,
}: {
  body: MessageDescriptor,
  image: string,
  title: MessageDescriptor,
}) => (
  <div className={styles.gridItem}>
    <Image alt={title} className={styles.gridItemImage} src={image} />
    <Heading
      appearance={{
        size: 'mediumLarge',
        theme: 'dark',
        weight: 'medium',
      }}
      text={title}
    />
    <div className={styles.body}>
      <p>
        <FormattedMessage {...body} />
      </p>
    </div>
  </div>
);

const displayName = 'pages.Website.AboutColonyNetwork.Infrastructure';

const Infrastructure = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <div className={styles.introContent}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <div className={styles.introContentBody}>
          <p>
            <FormattedMessage {...MSG.body} values={{ br: <br /> }} />
          </p>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <GridItem
          body={MSG.bodyPermissionless}
          image={withPrefix('/img/png-icons/icon_permissionless.png')}
          title={MSG.titlePermissionless}
        />
        <GridItem
          body={MSG.bodyModular}
          image={withPrefix('/img/png-icons/icon_modular.png')}
          title={MSG.titleModular}
        />
        <GridItem
          body={MSG.bodySelfSovereign}
          image={withPrefix('/img/png-icons/icon_community.png')}
          title={MSG.titleSelfSovereign}
        />
      </div>
    </div>
  </div>
);

Infrastructure.displayName = displayName;

export default Infrastructure;
