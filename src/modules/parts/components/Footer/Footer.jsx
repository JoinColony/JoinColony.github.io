/* @flow */
import React from 'react';

import Link from '~core/Link';

import styles from './Footer.module.css';

const Footer = () => {
  const socialIconPath = '/img/';
  const socialLinks = [
    {
      name: 'Github',
      url: 'https://github.com/JoinColony',
      icon: 'social_github.svg#social_github',
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/r/joincolony/',
      icon: 'social_reddit.svg#social_reddit',
    },
    {
      name: 'Medium',
      url: 'https://blog.colony.io/',
      icon: 'social_medium.svg#social_medium',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/joincolony',
      icon: 'social_twitter.svg#social_twitter',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <Link href="https://colony.io" className={styles.logo}>
              <svg viewBox="0 0 122 112" role="img" aria-label="Colony">
                <title>Colony</title>
                {/* eslint-disable-next-line max-len */}
                <use xlinkHref="/img/colony_logo_vertical_white.svg#colony_logo_vertical_white" />
              </svg>
            </Link>
            <p className={styles.logoTagline}>
              A Platform for
              <br />
              Open Organizations
            </p>
          </div>
          <ul className={styles.socials}>
            {socialLinks.map(socialLink => (
              <Link
                key={socialLink.name}
                className={styles.socialItem}
                href={socialLink.url}
              >
                <span className={styles.hide} aria-hidden>
                  Colony on {socialLink.name}
                </span>
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 32 32"
                  role="img"
                  aria-label={socialLink.name}
                >
                  <title>
                    Colony on
                    {socialLink.name}
                  </title>
                  <use xlinkHref={`${socialIconPath}${socialLink.icon}`} />
                </svg>
              </Link>
            ))}
          </ul>
          <nav className={styles.nav} role="navigation">
            <Link
              className={styles.navLink}
              href="https://colony.io/get-involved"
            >
              Get Involved
            </Link>
            <Link className={styles.navLink} href="https://blog.colony.io">
              Blog
            </Link>
            <Link className={styles.navLink} href="https://colony.io/terms">
              Terms
            </Link>
            <Link className={styles.navLink} href="https://colony.io/login">
              Login
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
