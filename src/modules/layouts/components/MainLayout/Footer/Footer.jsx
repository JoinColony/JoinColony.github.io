/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Icon from '~core/Icon';
import Link from '~core/Link';
import {
  COLONY_BLOG,
  COLONY_GITHUB,
  COLONY_REDDIT,
  COLONY_TWITTER,
  COLONY_WEBSITE,
  PAGE_GET_INVOLVED,
  PAGE_LOGIN,
  PAGE_TERMS_SERVICE,
} from '~routes';

import styles from './Footer.module.css';

const MSG = defineMessages({
  contentTagline: {
    id: 'layouts.MainLayout.Footer.contentTagline',
    defaultMessage: 'A Platform for {lineBreak} Open Organizations',
  },
  linkBlog: {
    id: 'layouts.MainLayout.Footer.linkBlog',
    defaultMessage: 'Blog',
  },
  linkGetInvolved: {
    id: 'layouts.MainLayout.Footer.linkGetInvolved',
    defaultMessage: 'Get Involved',
  },
  linkLogin: {
    id: 'layouts.MainLayout.Footer.linkLogin',
    defaultMessage: 'Login',
  },
  linkTerms: {
    id: 'layouts.MainLayout.Footer.linkTerms',
    defaultMessage: 'Terms',
  },
  socialIconTitle: {
    id: 'layouts.MainLayout.Footer.socialIconTitle',
    defaultMessage: 'Colony on {platform}',
    description: 'For instance, `Colony on GitHub`',
  },
});

const displayName = 'layouts.MainLayout.Footer';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Github',
      url: COLONY_GITHUB,
      icon: 'social_github',
    },
    {
      name: 'Reddit',
      url: COLONY_REDDIT,
      icon: 'social_reddit',
    },
    {
      name: 'Medium',
      url: COLONY_BLOG,
      icon: 'social_medium',
    },
    {
      name: 'Twitter',
      url: COLONY_TWITTER,
      icon: 'social_twitter',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <Link href={COLONY_WEBSITE} className={styles.logo}>
              <Icon
                name="colony_logo_vertical_white"
                title="Colony"
                viewBox="0 0 122 112"
              />
            </Link>
            <p className={styles.logoTagline}>
              <FormattedMessage
                {...MSG.contentTagline}
                values={{ lineBreak: <br /> }}
              />
            </p>
          </div>
          <ul className={styles.socials}>
            {socialLinks.map(socialLink => (
              <Link
                key={socialLink.name}
                className={styles.socialItem}
                href={socialLink.url}
              >
                <Icon
                  className={styles.socialIcon}
                  title={MSG.socialIconTitle}
                  titleValues={{
                    platform: socialLink.name,
                  }}
                  name={socialLink.icon}
                />
              </Link>
            ))}
          </ul>
          <nav className={styles.nav} role="navigation">
            <Link
              className={styles.navLink}
              href={PAGE_GET_INVOLVED}
              text={MSG.linkGetInvolved}
            />
            <Link
              className={styles.navLink}
              href={COLONY_BLOG}
              text={MSG.linkBlog}
            />
            <Link
              className={styles.navLink}
              href={PAGE_TERMS_SERVICE}
              text={MSG.linkTerms}
            />
            <Link
              className={styles.navLink}
              href={PAGE_LOGIN}
              text={MSG.linkLogin}
            />
          </nav>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = displayName;

export default Footer;
