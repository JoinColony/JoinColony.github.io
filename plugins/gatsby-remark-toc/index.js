const generateTOC = require('mdast-util-toc')

module.exports = (
  { markdownNode, markdownAST },
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

  // This is to just use the headings below the TOC as headlines
  const reducedAst = {
    type: 'root',
    children: markdownAST.children.slice(placeholderIndex + 1)
  }

  const toc = generateTOC(reducedAst).map

  if (!toc) {
    return;
  }

  // Any other hints on how to style the TOC are highly appreciated
  // This way we can use $('.gatsby-toc + ul') to target it
  const cssTarget = {
    type: 'html',
    value: '<div class="gatsby-toc" style="display:hidden"></div>'
  }

  markdownAST.children = [
    ...markdownAST.children.slice(0, placeholderIndex),
    cssTarget,
    toc,
    ...markdownAST.children.slice(placeholderIndex + 1),
  ]
}
