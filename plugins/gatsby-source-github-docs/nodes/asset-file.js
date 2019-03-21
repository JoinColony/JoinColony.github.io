const createNodeHelpers = require('gatsby-node-helpers').default

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Docs',
})

const ASSET_FILE_TYPE = 'AssetFile'

const AssetFile = createNodeFactory(ASSET_FILE_TYPE, node => {
  node.id = generateNodeId(
    ASSET_FILE_TYPE,
    `${node.sourceInstanceName}__${node.name}`
  )
  node.internal = {
    type: 'GitHubDocFile',
    contentDigest: node.meta.oid,
  }
  if (node.meta.content) {
    node.internal.content = node.meta.content
  }
  node.base = node.name
  delete node.meta
  return node
})

module.exports = AssetFile
