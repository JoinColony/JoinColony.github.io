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
        }
      }
    }
  }
`;

const onCreateNode = async ({ actions: { createNode }, getNode, node }, nodeOptions) => {
  if (node.internal.type === 'MarkdownRemark' && getNode(node.parent).sourceInstanceName === 'tutorials') {
    let tutorialNode;
    const { tutorialName, tutorialId } = getTutorialInfo(node);
    tutorialNode = getNode(tutorialId);
    if (!tutorialNode) {
      tutorialNode = createTutorialNode(tutorialName, null, createNode, nodeOptions);
    }
  }
};

const createPages = ({ graphql, actions: { createPage } }, nodeOptions) => {
  return graphql(nodeQuery).then(({ data: { tutorials: { edges }} }) => {
    edges.forEach(({ node: tutorial }) => {
      createTutorialPage(tutorial, createPage, nodeOptions);
    });
  });
};

const createTutorialNode = (name, sectionNode, createNode, { slugPrefix }) => {
  const tutorialNode = TutorialNode({
    name,
    slug: `${slugify(slugPrefix, { lower: true })}/${slugify(name, { lower: true })}`,
  });
  if (sectionNode) addChildNode(tutorialNode, sectionNode, 'sections');
  createNode(tutorialNode);
  return tutorialNode;
};

const createTutorialPage = ({ id, slug }, createPage, nodeOptions) => {
  createPage({
    path: slug,
    component: path.resolve(__dirname, '..', '..', 'src', 'modules', 'pages', 'components', 'TutorialPage', 'TutorialPage.jsx'),
    context: {
      tutorialId: id,
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
