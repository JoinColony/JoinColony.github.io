import React from 'react';

import FileContext from '../../contexts/FileContext';

const Image = ({ alt, src, files, project, ...props }) => (
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

export default Image;
