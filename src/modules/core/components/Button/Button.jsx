/* @flow */
import type { Node } from 'react';

import React from 'react';

import Link from '~core/Link';
import { getMainClasses } from '~utils/css';

import styles from './Button.module.css';

type Appearance = {
  theme?: 'primary' | 'reset',
};

type Props = {
  appearance?: Appearance,
  children: Node,
  className?: string,
  /** Use a link instead of a button. Like `@reach/router`'s `to` property */
  linkTo?: string,
  /** Button type (button|submit) */
  type?: string,
};

const Button = ({
  appearance = { theme: 'primary' },
  children,
  className,
  linkTo,
  type = 'button',
  ...rest
}: Props) => {
  const classNames = className || getMainClasses(appearance, styles);

  if (linkTo) {
    return (
      <Link className={classNames} href={linkTo} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classNames} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
