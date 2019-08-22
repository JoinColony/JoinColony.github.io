/* @flow */

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import type { OutProps } from './types';

import styles from './Link.module.css';

const displayName = 'Link';

const Link = ({
  activeClassName,
  arrow,
  children,
  className,
  href,
  intl: { formatMessage },
  isInternal,
  persistLocale,
  text,
  textValues,
  transformUrl,
  ...props
}: OutProps) => {
  const linkText =
    typeof text === 'string' ? text : text && formatMessage(text, textValues);
  const linkContent = linkText || children || null;
  const classNames = className ? `${styles.main} ${className}` : styles.main;
  return isInternal ? (
    <GatsbyLink className={classNames} to={href} {...props}>
      <span className={styles[arrow]}>{linkContent}</span>
    </GatsbyLink>
  ) : (
    <a className={classNames} href={href} {...props}>
      <span className={styles[arrow]}>{linkContent}</span>
    </a>
  );
};

Link.displayName = displayName;

export default Link;
