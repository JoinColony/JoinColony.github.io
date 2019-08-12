/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';

import styles from './FirmToFluid.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.About.FirmToFluid.title',
    defaultMessage: 'From firm to fluid.',
  },
  bodyLeft: {
    id: 'pages.Website.About.FirmToFluid.bodyLeft',
    defaultMessage: `"In the past there were big and complex tasks that
      required many people working on them. The 'transaction costs' involved
      to get coordination between people was high, so the concept of a Manager
      was introduced. As the number of Managers increased, a Manager of the
      Managers was created... and hierarchies formed.
      {br}{br}
      This resulted in order, clarity of authority, rank, and power. They
      reinforced a single primary connection: manager to worker, and enabled
      a command and control style of leadership that was terrifically successful
      during the industrial era.`,
  },
  bodyRight: {
    id: 'pages.Website.About.FirmToFluid.bodyRight',
    defaultMessage: `Today, technology and connectivity has increased our
      ability to self-organize, collaborating more easily across internal and
      external organizational boundaries. It is no longer necessarily true
      that coordinating through a Manager is more effective than people
      self-organizing. Working as a network allows us to organize with many
      different kinds of connections, and increased autonomy."
      {br}{br}
      {link}`,
  },
});

const displayName = 'pages.Website.About.FirmToFluid';

const FirmToFluid = () => (
  <div className={styles.main}>
    <div className={styles.contentContainer}>
      <Heading
        appearance={{ margin: 'none', size: 'large', theme: 'dark' }}
        text={MSG.title}
      />
      <div className={styles.body}>
        <div className={styles.bodyColumn}>
          <Paragraph text={MSG.bodyLeft} />
        </div>
        <div className={styles.bodyColumn}>
          <Paragraph
            text={MSG.bodyRight}
            textValues={{
              link: (
                <Link
                  href="https://www.responsive.org/"
                  text="Responsive.org"
                />
              ),
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

FirmToFluid.displayName = displayName;

export default FirmToFluid;
