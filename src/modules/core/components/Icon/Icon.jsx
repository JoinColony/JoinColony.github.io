/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';
import { withPrefix } from 'gatsby';

import iconNames from './icons.json';

type Props = {|
  /** Standard className */
  className?: string,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** Name of the icon (all available names found in `icons.json`) */
  name: string,
  /** Standard html title attribute. Can be a string or a `messageDescriptor` */
  title: MessageDescriptor | string,
  /** Values for loading title (react-intl interpolation) */
  titleValues?: Object,
  /** Override the default viewBox */
  viewBox?: string,
|};

const getIcons = (map: Array<string>) =>
  map.reduce((prev, current) => {
    // eslint-disable-next-line no-param-reassign
    prev[current] = withPrefix(`/img/${current}.svg#${current}`);
    return prev;
  }, {});

const icons = getIcons(iconNames);

const displayName = 'Icon';

const Icon = ({
  className,
  intl: { formatMessage },
  name,
  title,
  titleValues,
  viewBox: viewBoxOverride = '0 0 30 30',
}: Props) => {
  const icon = icons[name];
  const titleText =
    typeof title === 'string' ? title : formatMessage(title, titleValues);
  return (
    <i className={className} title={titleText}>
      <svg viewBox={viewBoxOverride} role="img" aria-label={titleText}>
        <title>{titleText}</title>
        <use xlinkHref={icon} />
      </svg>
    </i>
  );
};

Icon.displayName = displayName;

export default injectIntl(Icon);
