const createNodeHelpers = require('gatsby-node-helpers').default;

const { createNodeFactory, generateNodeId } = createNodeHelpers({
  typePrefix: 'Tutorials',
});

const TUTORIAL_TYPE = 'Tutorial';

const TutorialNode = createNodeFactory(TUTORIAL_TYPE, node => {
  node.id = generateNodeId(TUTORIAL_TYPE, node.name);
  node.internal = {
    type: TUTORIAL_TYPE,
  };
  return node;
});

module.exports = TutorialNode;
