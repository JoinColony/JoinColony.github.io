/* @flow */

import type { IntlShape, MessageDescriptor } from 'react-intl';

import React from 'react';
import { injectIntl } from 'react-intl';

import FileContext from '~context/FileContext';

type Props = {
  alt: MessageDescriptor | string,
  altValues?: Object,
  intl: IntlShape,
  project?: string,
  src: string,
};

const displayName = 'Image';

const Image = ({
  alt,
  altValues,
  intl: { formatMessage },
  project,
  src,
  ...props
}: Props) => {
  const altText = typeof alt === 'string' ? alt : formatMessage(alt, altValues);
  return (
    <FileContext.Consumer>
      {files => (
        <img
          {...props}
          alt={altText}
          src={
            files && project && files[`${project}/${src}`]
              ? files[`${project}/${src}`]
              : src
          }
        />
      )}
    </FileContext.Consumer>
  );
};

Image.displayName = displayName;

export default injectIntl(Image);
