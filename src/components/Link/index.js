import React from 'react'
import GatsbyLink from 'gatsby-link'

function isExternal(url) {
  if ((url && url.startsWith('http')) || url.startsWith('mailto')) {
    return true
  }
  return false
}

const Link = ({ children, href, ...props }) =>
  isExternal(href) ? (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <GatsbyLink to={href} {...props}>
      {children}
    </GatsbyLink>
  )

export default Link
