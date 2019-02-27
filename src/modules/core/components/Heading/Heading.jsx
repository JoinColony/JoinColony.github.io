/* @flow */
import type { Node } from 'react';
import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import { getMainClasses } from '~utils/css';
import { getChildrenOrText } from '~utils/strings';

import styles from './Heading.module.css';

type Appearance = {
  theme?: 'primary' | 'dark' | 'invert' | 'uppercase',
  margin?: 'none' | 'small' | 'double',
  size: 'tiny' | 'small' | 'normal' | 'medium' | 'large' | 'huge',
  weight?: 'thin' | 'medium' | 'bold',
};

type ValidTagNames = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  /** Appearance object */
  appearance?: Appearance,
  /** Used to extend the functionality of the component. This will not generate a title attribute on the element. */
  children?: Node,
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
  children,
  intl,
  tagName,
  text,
  textValues,
  ...props
}: Props) => {
  const { size } = appearance;
  const HeadingElement =
    tagName ||
    {
      huge: 'h1',
      large: 'h2',
      medium: 'h3',
      normal: 'h4',
      small: 'h5',
      tiny: 'h6',
    }[size || 'huge'];
  const value = getChildrenOrText(children, text, textValues, intl);
  return (
    <HeadingElement
      title={typeof value === 'string' ? value : undefined}
      className={getMainClasses(appearance, styles)}
      {...props}
    >
      {value}
    </HeadingElement>
  );
};

Heading.displayName = displayName;

export default injectIntl(Heading);
