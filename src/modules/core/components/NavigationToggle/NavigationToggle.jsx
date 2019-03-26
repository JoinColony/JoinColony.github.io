/* @flow */
import React from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import { getMainClasses } from '~utils/css';

import styles from './NavigationToggle.module.css';

const MSG = defineMessages({
  btnTitleToggleNavigation: {
    id: 'NavigationToggle.btnTitleToggleNavigation',
    defaultMessage: 'Toggle Navigation',
  },
});

type Appearance = {|
  hideAtSize?: 'small' | 'medium' | 'large',
  theme?: 'light',
|};

type Props = {|
  appearance?: Appearance,
  isNavOpen: boolean,
  onClick: (evt: SyntheticEvent<HTMLButtonElement>) => void,
|};

const displayName = 'NavigationToggle';

const NavigationToggle = ({ appearance, isNavOpen, onClick }: Props) => (
  <span
    className={getMainClasses(appearance, styles, {
      isNavOpen,
    })}
  >
    <Button
      aria-hidden
      className={styles.mobileIcon}
      onClick={onClick}
      title={MSG.btnTitleToggleNavigation}
    >
      <span className={styles.mobileIconLine} />
      <span className={styles.mobileIconLine} />
      <span className={styles.mobileIconLine} />
      <span className={styles.mobileIconLine} />
    </Button>
  </span>
);

NavigationToggle.displayName = displayName;

export default NavigationToggle;
