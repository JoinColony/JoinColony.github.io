/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import GridItem from '~core/GridItem';
import Heading from '~core/Heading';
import Paragraph from '~core/Paragraph';

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

const displayName = 'pages.Website.AboutColonyNetwork.Infrastructure';

const Infrastructure = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <div className={styles.introContent}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <Paragraph appearance={{ size: 'medium' }} text={MSG.body} />
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <GridItem
            body={MSG.bodyPermissionless}
            image={withPrefix('/img/png-icons/icon_permissionless.png')}
            title={MSG.titlePermissionless}
          />
        </div>
        <div className={styles.gridItem}>
          <GridItem
            body={MSG.bodyModular}
            image={withPrefix('/img/png-icons/icon_modular.png')}
            title={MSG.titleModular}
          />
        </div>
        <div className={styles.gridItem}>
          <GridItem
            body={MSG.bodySelfSovereign}
            image={withPrefix('/img/png-icons/icon_community.png')}
            title={MSG.titleSelfSovereign}
          />
        </div>
      </div>
    </div>
  </div>
);

Infrastructure.displayName = displayName;

export default Infrastructure;
