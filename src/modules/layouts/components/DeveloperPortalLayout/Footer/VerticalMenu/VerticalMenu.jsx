/* @flow */
import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import type { InProps as LinkProps } from '~core/Link/types';

import Heading from '~core/Heading';
import Link from '~core/Link';

type Props = {|
  headingText?: MessageDescriptor | string,
  headingTextValues?: Object,
  menuItems: Array<LinkProps>,
|};

const displayName = 'layouts.DeveloperPortalLayout.Footer.VerticalMenu';

const VerticalMenu = ({ headingText, headingTextValues, menuItems }: Props) => {
  return (
    <div>
      {headingText && (
        <Heading
          appearance={{ size: 'small', theme: 'invert', weight: 'medium' }}
          text={headingText}
          textValues={headingTextValues}
        />
      )}
      {menuItems.length > 0 && (
        <nav>
          {menuItems.map(menuItemProps => (
            <Link {...menuItemProps} />
          ))}
        </nav>
      )}
    </div>
  );
};

VerticalMenu.displayName = displayName;

export default VerticalMenu;
