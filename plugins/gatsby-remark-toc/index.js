const generateTOC = require('mdast-util-toc')

module.exports = (
  { markdownAST },
  {
    placeholder = '==TOC==',
  }
) => {

  const placeholderIndex = markdownAST.children.findIndex(
    node =>
      node.children &&
      node.children.length &&
      node.children[0].value === placeholder
  )

  if (placeholderIndex < 0) {
    return
  }

  markdownAST.children = [
    ...markdownAST.children.slice(0, placeholderIndex),
    ...markdownAST.children.slice(placeholderIndex + 1),
  ]
}
