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
  const { projects: configuredProjects } = nodeOptions;
  if (node.internal.type === 'MarkdownRemark' && configuredProjects.includes(getNode(node.parent).sourceInstanceName)) {
    const { langConfig: { defaultLangKey, prefixDefaultLangKey } } = nodeOptions;

    let tutorialNode;
    const { tutorialName, tutorialId } = getTutorialInfo(node);
    tutorialNode = getNode(tutorialId);
    if (!tutorialNode) {
      tutorialNode = createTutorialNode(tutorialName, createNode, nodeOptions);
    }
    createNodeField({ node: tutorialNode, name: 'markdownNodeId', value: node.id });
    
    const editUrl = getNodeEditUrl(getNode(node.parent))
    createNodeField({
      node: tutorialNode,
      name: 'editUrl',
      value: editUrl,
    })
    node.editUrl = editUrl;

    if (!node.frontmatter.locale) {
      node.frontmatter.locale = defaultLangKey;
    }
    const nodeLocale = node.frontmatter.locale;
    const localeSlugPrefix = nodeLocale === defaultLangKey && !prefixDefaultLangKey ? '' : `${nodeLocale}/`;
    // Add a slug as the TOC creation requires that (for linking)
    node.slug = slugify(node.frontmatter.title, { lower: true })
    // Slug for the actual page
    createNodeField({
      node: tutorialNode,
      name: 'slug',
      value: `/${localeSlugPrefix}${tutorialNode.slug}`,
    })
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

const getNodeEditUrl = parent => {
  // github sourced
  if(parent && parent.githubEditPath) {
    return `https://github.com/${parent.githubEditPath}`;
  }
  // filesystem sourced - assume master branch
  const projectName = parent.sourceInstanceName;
  return `https://github.com/JoinColony/${projectName}/edit/master/tutorials/${parent.relativePath}`;
};

const getTutorialInfo = node => {
  const tutorialName = node.frontmatter.title;
  const tutorialId = TutorialNode({ name: tutorialName }).id;
  return { tutorialName, tutorialId };
};

exports.createPages = createPages;
exports.onCreateNode = onCreateNode;
