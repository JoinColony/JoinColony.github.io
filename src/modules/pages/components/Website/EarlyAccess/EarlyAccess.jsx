/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import WebsiteLayout from '~layouts/WebsiteLayout';
import SEO from '~parts/SEO';
import { COLONY_DISCOURSE } from '~routes';

import Form from './Form.jsx';

import styles from './EarlyAccess.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.EarlyAccess.body',
    defaultMessage: `Colony's beta is live on Ethereum mainnet! It's just
      a baby, so features are limited, but if you're super keen, and committed
      to helping shape development, we are accepting beta users with suitable
      use cases.
      {br}{br}
      Want to learn more before diving in?
      {br}
      {sayHiLink} over in Discourse.`,
  },
  linkSayHiText: {
    id: 'pages.Website.EarlyAccess.linkSayHiText',
    defaultMessage: 'Say hi',
  },
  seoBody: {
    id: 'pages.Website.EarlyAccess.body',
    defaultMessage: `Colony's beta is live on Ethereum mainnet! It's just
      a baby, so features are limited, but if you're super keen, and committed
      to helping shape development, we are accepting beta users with suitable
      use cases.`,
  },
  title: {
    id: 'pages.Website.EarlyAccess.title',
    defaultMessage: 'Get early access to Colony.',
  },
});

type Props = {|
  location: {
    state?: { email?: string },
  },
|};

const displayName = 'pages.Website.EarlyAccess';

const EarlyAccess = ({ location }: Props) => {
  const email =
    location.state && location.state.email ? location.state.email : '';
  return (
    <WebsiteLayout>
      <SEO description={MSG.seoBody} title={MSG.title} />
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.formContainer}>
            <div className={styles.form}>
              <Form initialValues={{ email }} />
            </div>
          </div>
          <div className={styles.contentContainer}>
            <Image
              alt={MSG.title}
              className={styles.image}
              src={withPrefix('/img/png-icons/icon_access.png')}
            />
            <Heading
              appearance={{ size: 'large', theme: 'dark' }}
              text={MSG.title}
            />
            <Paragraph
              text={MSG.body}
              textValues={{
                sayHiLink: (
                  <Link
                    className={styles.link}
                    href={COLONY_DISCOURSE}
                    text={MSG.linkSayHiText}
                  />
                ),
              }}
            />
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

EarlyAccess.displayName = displayName;

export default EarlyAccess;
