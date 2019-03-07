/* @flow */
import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import slugify from 'slugify';

import type { InProps as LinkProps } from '~core/Link/types';

import Heading from '~core/Heading';
import Link from '~core/Link';

import styles from './VerticalMenu.module.css';

const MSG = defineMessages({
  navAriaLabelDefault: {
    id: 'latyous.DeveloperPortalLayout.Footer.VerticalMenu.navAriaLabelDefault',
    defaultMessage: 'Footer Site Navigation',
  },
});

type Props = {|
  headingText?: MessageDescriptor | string,
  headingTextValues?: Object,
  /* Injected via `injectIntl` */
  intl: IntlShape,
  menuItems: Array<LinkProps>,
  numColumns?: number,
|};

const displayName = 'layouts.DeveloperPortalLayout.Footer.VerticalMenu';

const VerticalMenu = ({
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
    <>
      {headingText && (
        <Heading
          appearance={{ size: 'small', theme: 'invert', weight: 'medium' }}
          id={slugify(labelText)}
          text={headingText}
          textValues={headingTextValues}
        />
      )}
      {menuItems.length > 0 && (
        <nav
          className={styles.menu}
          role="navigation"
          style={columnStyles}
          {...ariaProps}
        >
          {menuItems.map(menuItemProps => (
            <Link
              {...menuItemProps}
              className={styles.menuItem}
              key={menuItemProps.href}
            />
          ))}
        </nav>
      )}
    </>
  );
};

VerticalMenu.displayName = displayName;

export default injectIntl(VerticalMenu);
