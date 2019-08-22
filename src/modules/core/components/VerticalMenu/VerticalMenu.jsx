/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import slugify from 'slugify';

import type { Appearance as HeadingAppearance } from '~core/Heading';
import type { InProps as LinkProps } from '~core/Link/types';
import { getMainClasses } from '~utils/css';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './VerticalMenu.module.css';

const MSG = defineMessages({
  navAriaLabelDefault: {
    id: 'VerticalMenu.navAriaLabelDefault',
    defaultMessage: 'Alternate Navigation',
  },
});

type Appearance = {|
  alignText?: 'right',
  /*
   * Only has impact if `numColumns` is provided, and > 1.
   *
   * Since responsiveness is mobile-first, this will determine at
   * which viewport size (and up) the menu will be multi-column.
   *
   * Below this size, items will be in 1 column.
   */
  expandForViewport?: 'small' | 'medium' | 'large',
  margins?: 'none' | 'small' | 'large',
|};

type Props = {|
  appearance?: Appearance,
  headingAppearance?: HeadingAppearance,
  headingText?: MessageDescriptor | string,
  headingTextValues?: Object,
  /* Injected via `injectIntl` */
  intl: IntlShape,
  menuItems: Array<LinkProps>,
  numColumns?: number,
|};

const displayName = 'VerticalMenu';

const VerticalMenu = ({
  appearance,
  headingAppearance = {},
  headingText,
  headingTextValues,
  intl: { formatMessage },
  menuItems,
  numColumns = 1,
}: Props) => {
  const columnStyles = {
    columnCount: `${numColumns}`,
  };
  const labelText =
    typeof headingText === 'string'
      ? headingText
      : headingText && formatMessage(headingText, headingTextValues);
  const ariaProps = {};
  if (labelText) {
    ariaProps['aria-labelledby'] = slugify(labelText);
  } else {
    ariaProps['aria-label'] = formatMessage(MSG.navAriaLabelDefault);
  }
  return (
    <div className={getMainClasses(appearance, styles)}>
      {headingText && (
        <Heading
          appearance={{
            margin: 'small',
            size: 'normal',
            weight: 'medium',
            ...headingAppearance,
          }}
          id={slugify(labelText)}
          text={headingText}
          textValues={headingTextValues}
        />
      )}
      {menuItems && menuItems.length > 0 && (
        <nav
          className={styles.menu}
          role="navigation"
          style={columnStyles}
          {...ariaProps}
        >
          {menuItems.map(menuItemProps => (
            <div key={menuItemProps.href} className={styles.menuItem}>
              <Link {...menuItemProps} />
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};

VerticalMenu.displayName = displayName;

export default injectIntl(VerticalMenu);
