/* @flow */
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Icon from '~core/Icon';
import Link from '~core/Link';

import styles from './Footer.module.css';

const MSG = defineMessages({
  contentTagline: {
    id: 'parts.Footer.contentTagline',
    defaultMessage: 'A Platform for {lineBreak} Open Organizations',
  },
  linkBlog: {
    id: 'parts.Footer.linkBlog',
    defaultMessage: 'Blog',
  },
  linkGetInvolved: {
    id: 'parts.Footer.linkGetInvolved',
    defaultMessage: 'Get Involved',
  },
  linkLogin: {
    id: 'parts.Footer.linkLogin',
    defaultMessage: 'Login',
  },
  linkTerms: {
    id: 'parts.Footer.linkTerms',
    defaultMessage: 'Terms',
  },
  socialIconTitle: {
    id: 'parts.Footer.socialIconTitle',
    defaultMessage: 'Colony on {platform}',
    description: 'For instance, `Colony on GitHub`',
  },
});

const displayName = 'parts.Footer';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Github',
      url: 'https://github.com/JoinColony',
      icon: 'social_github',
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/r/joincolony/',
      icon: 'social_reddit',
    },
    {
      name: 'Medium',
      url: 'https://blog.colony.io/',
      icon: 'social_medium',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/joincolony',
      icon: 'social_twitter',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <Link href="https://colony.io" className={styles.logo}>
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
              href="https://colony.io/get-involved"
              text={MSG.linkGetInvolved}
            />
            <Link
              className={styles.navLink}
              href="https://blog.colony.io"
              text={MSG.linkBlog}
            />
            <Link
              className={styles.navLink}
              href="https://colony.io/terms"
              text={MSG.linkTerms}
            />
            <Link
              className={styles.navLink}
              href="https://colony.io/login"
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
