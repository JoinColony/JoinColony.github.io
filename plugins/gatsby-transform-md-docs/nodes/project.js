const createNodeHelpers = require('gatsby-node-helpers').default

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Docs',
})

const PROJECT_TYPE = 'Project'

const ProjectNode = createNodeFactory(PROJECT_TYPE, node => {
  node.id = generateNodeId(PROJECT_TYPE, node.name)
  node.internal = {
    type: 'Project',
  }
  return node
})

module.exports = ProjectNode
