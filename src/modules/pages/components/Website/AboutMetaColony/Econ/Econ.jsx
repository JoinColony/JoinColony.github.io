/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Breakpoint from '~core/Breakpoint';
import Heading from '~core/Heading';
import Image from '~core/Image';
import Paragraph from '~core/Paragraph';

import styles from './Econ.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.AboutMetaColony.Econ.title',
    defaultMessage: 'Econ 101',
  },
  feeTextOne: {
    id: 'pages.Website.AboutMetaColony.Econ.feeTextOne',
    defaultMessage: `The Colony Network levies a 2.77% fee on all
      Payments from each colony.`,
  },
  feeTextTwo: {
    id: 'pages.Website.AboutMetaColony.Econ.feeTextTwo',
    defaultMessage: `Fees paid in ETH or DAI go to the Metacolony
      to sustain ongoing development, security, and Colony's
      ecosystem incentive mechanism: BudgetBox.`,
  },
  feeTextThree: {
    id: 'pages.Website.AboutMetaColony.Econ.feeTextThree',
    defaultMessage: `Fees paid in other ERC20 tokens go to auctions.
    There, token buyers can purchase ERC20 tokens using Colony's
    Native Token, CLNY. The CLNY is then burned.`,
  },
  introText: {
    id: 'pages.Website.AboutMetaColony.Econ.introText',
    defaultMessage: `Since Colony isn't a private company, the
      network fee won't go to one either. Fees go to the Metacolony
      to sustain ongoing development, security, and Colony's
      ecosystem incentive mechanism: BudgetBox.`,
  },
});

const displayName = 'pages.Website.AboutMetaColony.Econ';

const Econ = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{ margin: 'double', theme: 'dark' }}
        text={MSG.title}
      />
      <div className={styles.introText}>
        <Paragraph
          appearance={{ margin: 'none', size: 'medium' }}
          text={MSG.introText}
        />
      </div>
      <Breakpoint size="medium">
        <Image
          alt={MSG.title}
          className={styles.image}
          src={withPrefix('/img/diagram_clnyEcon.png')}
        />
      </Breakpoint>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <Breakpoint inclusion="down" size="small">
            <Image
              alt={MSG.feeTextOne}
              className={styles.image}
              src={withPrefix('/img/diagram_clnyEcon_mobile_1.png')}
            />
          </Breakpoint>
          <Paragraph text={MSG.feeTextOne} />
        </div>
        <div className={styles.gridItem}>
          <Breakpoint inclusion="down" size="small">
            <Image
              alt={MSG.feeTextTwo}
              className={styles.image}
              src={withPrefix('/img/diagram_clnyEcon_mobile_2.png')}
            />
          </Breakpoint>
          <Paragraph text={MSG.feeTextTwo} />
        </div>
        <div className={styles.gridItem}>
          <Breakpoint inclusion="down" size="small">
            <Image
              alt={MSG.feeTextThree}
              className={styles.image}
              src={withPrefix('/img/diagram_clnyEcon_mobile_3.png')}
            />
          </Breakpoint>
          <Paragraph text={MSG.feeTextThree} />
        </div>
      </div>
    </div>
  </div>
);

Econ.displayName = displayName;

export default Econ;
