const path = require('path');
const slugify = require('slugify');

const { TutorialNode } = require('./nodes');

const nodeQuery = `
  {
    tutorials: allTutorial {
      edges {
        node {
          id
          name
          slug
          fields {
            markdownNodeId
          }
        }
      }
    }
  }
`;

const onCreateNode = async ({ actions: { createNode, createNodeField }, getNode, node }, nodeOptions) => {
  if (node.internal.type === 'MarkdownRemark' && getNode(node.parent).sourceInstanceName === 'tutorials') {
    let tutorialNode;
    const { tutorialName, tutorialId } = getTutorialInfo(node);
    tutorialNode = getNode(tutorialId);
    if (!tutorialNode) {
      tutorialNode = createTutorialNode(tutorialName, createNode, nodeOptions);
    }
    createNodeField({ node: tutorialNode, name: 'markdownNodeId', value: node.id });
  }
};

const createPages = ({ graphql, actions: { createPage } }, nodeOptions) => {
  return graphql(nodeQuery).then(({ data: { tutorials: { edges }} }) => {
    edges.forEach(({ node: tutorial }) => {
      createTutorialPage(tutorial, createPage, nodeOptions);
    });
  });
};

const createTutorialNode = (name, createNode, { slugPrefix }) => {
  const tutorialNode = TutorialNode({
    name,
    slug: `${slugify(slugPrefix, { lower: true })}/${slugify(name, { lower: true })}`,
  });
  createNode(tutorialNode);
  return tutorialNode;
};

const createTutorialPage = ({ slug, fields: { markdownNodeId } }, createPage, nodeOptions) => {
  createPage({
    path: slug,
    component: path.resolve(__dirname, '..', '..', 'src', 'modules', 'pages', 'components', 'TutorialPage', 'TutorialPage.jsx'),
    context: {
      tutorialId: markdownNodeId,
    },
  });
};

const getTutorialInfo = node => {
  const tutorialName = node.frontmatter.title;
  const tutorialId = TutorialNode({ name: tutorialName }).id;
  return { tutorialName, tutorialId };
};

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
