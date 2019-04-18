const generateTOC = require('mdast-util-toc');
const visit = require('unist-util-visit');

module.exports = (
  { markdownAST },
  {
    placeholder = '==TOC==',
    className = 'md-toc',
  },
) => {

  const placeholderIndex = markdownAST.children.findIndex(
    node =>
      node.children &&
      node.children.length &&
      node.children[0].value === placeholder
  );


  // This is to just use the headings below the TOC as headlines (if TOC exists, otherwise whole page).
  const astForToc = placeholderIndex < 0
    ? markdownAST
    : {
        type: 'root',
        children: markdownAST.children.slice(placeholderIndex + 1)
      };

  const toc = generateTOC(astForToc).map;

  if (!toc) {
    return;
  }

  visit(toc, 'list', (node, index, parent) => {
    // Only apply className to top-level list, not children
    if (!index && !parent) {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties.className = node.data.hProperties.className || [];
      node.data.hProperties.className.push(className);
    }
  });

  if (placeholderIndex < 0) {
    markdownAST.children = [
      toc,
      ...markdownAST.children,
    ];
  } else {
    markdownAST.children = [
      ...markdownAST.children.slice(0, placeholderIndex),
      toc,
      ...markdownAST.children.slice(placeholderIndex + 1),
    ];
  }

  return markdownAST;
}
