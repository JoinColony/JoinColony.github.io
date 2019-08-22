/* @flow */

import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';
import { getChildrenOrText } from '~utils/strings';

import styles from './Heading.module.css';

export type Appearance = {|
  theme?:
    | 'dark'
    | 'light'
    | 'invert'
    | 'primary'
    | 'grey'
    | 'gold'
    | 'lightBlue',
  margin?: 'none' | 'tiny' | 'small' | 'medium' | 'large' | 'double',
  size?:
    | 'tiny'
    | 'small'
    | 'normal'
    | 'medium'
    | 'mediumLarge'
    | 'large'
    | 'huge'
    | 'massive',
  weight?: 'thin' | 'medium' | 'bold',
|};

type ValidTagNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Used to extend the functionality of the component. This will not generate a title attribute on the element. */
  children?: Node,
  /** Setting this will add className styles to the `appearance` object */
  className?: string,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  /** String that will hard set the heading element to render */
  tagName?: ValidTagNames,
  /** A string or a `MessageDescriptor` that make up the headings's text */
  text?: MessageDescriptor | string,
  /** Values for text (react-intl interpolation) */
  textValues?: Object,
};

const displayName = 'Heading';

const Heading = ({
  appearance = { size: 'huge' },
  className,
  children,
  intl,
  tagName,
  text,
  textValues,
  ...props
}: Props) => {
  const classNames = className
    ? `${getMainClasses(appearance, styles)} ${className}`
    : getMainClasses(appearance, styles);
  const { size } = appearance;
  const HeadingElement =
    tagName ||
    {
      massive: 'h1',
      huge: 'h1',
      large: 'h2',
      medium: 'h3',
      mediumLarge: 'h3',
      normal: 'h4',
      small: 'h5',
      tiny: 'h6',
    }[size || 'huge'];
  const value = getChildrenOrText(children, text, textValues, intl);
  return (
    <HeadingElement
      title={typeof value === 'string' ? value : undefined}
      className={`${classNames} ${styles.heading}`}
      {...props}
    >
      {value}
    </HeadingElement>
  );
};

Heading.displayName = displayName;

export default injectIntl(Heading);
