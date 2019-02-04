/* @flow */
import React from 'react';

import Icon from '~core/Icon';
import Link from '~core/Link';

import styles from './Footer.module.css';

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
                <Icon
                  className={styles.socialIcon}
                  title={`Colony on ${socialLink.name}`}
                  name={socialLink.icon}
                />
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
