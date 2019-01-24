const createNodeHelpers = require('gatsby-node-helpers').default

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Docs',
})

const SECTION_TYPE = 'Section'

const SectionNode = createNodeFactory(SECTION_TYPE, node => {
  node.id = generateNodeId(SECTION_TYPE, `${node.project}_${node.name}`)
  node.internal = {
    type: 'Section',
  }
  return node
})

module.exports = SectionNode

