import React from 'react'

import { Consumer } from '../../contexts/FileContext'

const Image = ({ src, files, project, ...props }) => (
  <Consumer>
    {files => (
      <img
        {...props}
        src={
          files && files[`${project}/${src}`] ? files[`${project}/${src}`] : src
        }
      />
    )}
  </Consumer>
)

export default Image
