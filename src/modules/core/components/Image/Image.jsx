/* @flow */
import React from 'react';

import FileContext from '~context/FileContext';

type Props = {
  alt: string,
  src: string,
  project: string,
};

const displayName = 'Image';

const Image = ({ alt, src, project, ...props }: Props) => (
  <FileContext.Consumer>
    {files => (
      <img
        {...props}
        alt={alt}
        src={
          files && files[`${project}/${src}`] ? files[`${project}/${src}`] : src
        }
      />
    )}
  </FileContext.Consumer>
);

Image.displayName = displayName;

export default Image;
