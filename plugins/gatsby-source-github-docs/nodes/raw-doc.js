const createNodeHelpers = require('gatsby-node-helpers').default
const { getContentDigest } = require('../utils')

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Docs',
})

const RAW_DOC_TYPE = 'RawDoc'

const RawDocNode = createNodeFactory(RAW_DOC_TYPE, node => {
  node.id = generateNodeId(RAW_DOC_TYPE, `${node.sourceInstanceName}__${node.name}`)
  node.internal = {
    contentDigest: getContentDigest(node.object.text),
    type: RAW_DOC_TYPE,
    mediaType: 'text/markdown',
    content: node.object.text,
  }
  delete node.object
  return node
})

module.exports = RawDocNode
