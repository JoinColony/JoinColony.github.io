/* @flow */
import React from 'react';
import { withPrefix } from 'gatsby';

import iconNames from './icons.json';

type Props = {
  className?: string,
  name: string,
  title: string,
  viewBox?: string,
};

const getIcons = (map: Array<string>) =>
  map.reduce((prev, current) => {
    // eslint-disable-next-line no-param-reassign
    prev[current] = withPrefix(`/img/${current}.svg#${current}`);
    return prev;
  }, {});

const icons = getIcons(iconNames);

const Icon = ({
  className,
  name,
  title,
  viewBox: viewBoxOverride = '0 0 30 30',
}: Props) => {
  const icon = icons[name];
  return (
    <i className={className} title={title}>
      <svg viewBox={viewBoxOverride} role="img" aria-label={title}>
        <title>{title}</title>
        <use xlinkHref={icon} />
      </svg>
    </i>
  );
};

export default Icon;
