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
import { COLONY_DISCORD } from '~routes';

import Form from './Form.jsx';

import styles from './Contact.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.Contact.body',
    defaultMessage: `Colony's app is live! Not quite sure where to start or
      would like some more information? Leave your details here and we'll get
      back to you.
      {br}{br}
      Want to learn more before diving in?
      {br}
      {sayHiLink} over in our Discord.`,
  },
  linkSayHiText: {
    id: 'pages.Website.Contact.linkSayHiText',
    defaultMessage: 'Say hi',
  },
  seoBody: {
    id: 'pages.Website.Contact.body',
    defaultMessage: `Colony's app is live! Not quite sure where to start or
      would like some more information? Leave your details here and we'll get
      back to you.`,
  },
  title: {
    id: 'pages.Website.Contact.title',
    defaultMessage: 'Need help getting started?',
  },
});

type Props = {|
  location?: {
    state?: { email?: string },
  },
|};

const displayName = 'pages.Website.Contact';

const Contact = ({ location }: Props) => {
  const email =
    location && location.state && location.state.email
      ? location.state.email
      : '';
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
                    href={COLONY_DISCORD}
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

Contact.displayName = displayName;

export default Contact;
