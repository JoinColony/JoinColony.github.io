import React from 'react'

import styles from './Footer.module.css'

const Footer = () => {
  const socialIconPath = '/img/'
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
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.section}>
          <div className={styles.logoContainer}>
            <a href="https://colony.io" className={styles.logo}>
              <svg viewBox="0 0 122 112" role="img" aria-label="Colony">
                <title>Colony</title>
                <use xlinkHref="/img/colony_logo_vertical_white.svg#colony_logo_vertical_white" />
              </svg>
            </a>
            <p className={styles.logoTagline}>
              A Platform for
              <br />
              Open Organizations
            </p>
          </div>
          <ul className={styles.socials}>
            {socialLinks.map(socialLink => (
              <a
                key={socialLink.name}
                className={styles.socialItem}
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.hide} aria-hidden={true}>
                  Colony on {socialLink.name}
                </span>
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 32 32"
                  role="img"
                  aria-label={socialLink.name}
                >
                  <title>Colony on {socialLink.name}</title>
                  <use xlinkHref={`${socialIconPath}${socialLink.icon}`} />
                </svg>
              </a>
            ))}
          </ul>
          <nav className={styles.nav} role="navigation">
            <a
              className={styles.navLink}
              href="https://colony.io/get-involved"
              rel="noopener noreferrer"
              target="_blank"
            >
              Get Involved
            </a>
            <a
              className={styles.navLink}
              href="https://blog.colony.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              Blog
            </a>
            <a
              className={styles.navLink}
              href="https://colony.io/terms"
              rel="noopener noreferrer"
              target="_blank"
            >
              Terms
            </a>
            <a
              className={styles.navLink}
              href="https://colony.io/login"
              rel="noopener noreferrer"
              target="_blank"
            >
              Login
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
