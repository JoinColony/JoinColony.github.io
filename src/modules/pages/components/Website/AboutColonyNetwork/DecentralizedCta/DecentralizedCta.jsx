/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Link from '~core/Link';
import BlockCta from '~parts/BlockCta';
import { PAGE_ABOUT_METACOLONY } from '~routes';

import styles from './DecentralizedCta.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.AboutColonyNetwork.DecentralizedCta.body',
    defaultMessage: `Everything in the Colony stack must, in principle,
      function without relying on any component or service that is
      hosted, owned, or otherwise ‘centralized’.
      {br}{br}{br}
      Not a lot of people realize what a big deal this is. It provides
      users with important guarantees that the infrastructure their
      business critically relies upon is impartial and unstoppable.
      {br}{br}{br}
      {link}`,
  },
  linkText: {
    id: 'pages.Website.AboutColonyNetwork.DecentralizedCta.linkText',
    defaultMessage: 'Tell me more',
  },
  title: {
    id: 'pages.Website.AboutColonyNetwork.DecentralizedCta.title',
    defaultMessage: 'Fully Decentralized. No Comporomises.',
  },
});

const displayName = 'pages.Website.AboutColonyNetwork.DecentralizedCta';

const DecentralizedCta = () => (
  <BlockCta
    leftBlockChildren={
      <Heading appearance={{ theme: 'invert' }} text={MSG.title} />
    }
    rightBlockChildren={
      <p className={styles.body}>
        <FormattedMessage
          {...MSG.body}
          values={{
            br: <br />,
            link: (
              <Link
                className={styles.link}
                href={PAGE_ABOUT_METACOLONY}
                text={MSG.linkText}
              />
            ),
          }}
        />
      </p>
    }
  />
);

DecentralizedCta.displayName = displayName;

export default DecentralizedCta;
