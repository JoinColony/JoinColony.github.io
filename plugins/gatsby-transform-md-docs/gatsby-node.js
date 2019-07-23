const path = require('path')
const slugify = require('slugify')
const { ProjectNode, SectionNode } = require('./nodes')
const { GraphQLList, GraphQLObjectType, GraphQLString } = require('gatsby/graphql');

const nodeQuery = `
  {
    projects: allProject {
      edges {
        node {
          id
          name
          slug
          sections {
            id
            name
            slug
            docs {
              id
              slug
              fields {
                locale
                slug
              }
              frontmatter {
                title
                locale
              }
              html
            }
          }
        }
      }
    }
  }
`

exports.onCreateNode = ({ node, actions, getNode }, nodeOptions) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink,
  } = actions
  const { langConfig: { defaultLangKey, prefixDefaultLangKey }, projects: configuredProjects } = nodeOptions;

  let projectNode
  let sectionNode

  if (node.base === 'doc.config.json' && configuredProjects.includes(node.sourceInstanceName)) {
    const { projectName, projectId } = getProjectInfo(node)
    projectNode = getNode(projectId)
    if (!projectNode) {
      projectNode = createProjectNode(projectName, null, createNode, nodeOptions)
    }
    let config
    if (node.internal.content) {
      // GitHub sourced
      try {
        config = JSON.parse(node.internal.content)
      } catch (e) {
        throw new Error(`Could not parse config file for ${projectName}`)
      }
    } else {
      // Filesystem sourced
      config = require(node.absolutePath)
    }

    projectNode.sectionOrder =
      config.sectionOrder &&
      config.sectionOrder.map(section => slugify(section, { lower: true }))
    projectNode.sectionTranslations = getProjectSectionTranslations(config);
    projectNode.logo = config.logo
    projectNode.logoSmall = config.logoSmall
    projectNode.description = config.description
    projectNode.descriptionTranslations = getProjectDescriptionTranslations(config);
    projectNode.repoUrl = `https://github.com/JoinColony/${projectNode.name}`;
  } else if (node.internal.type === 'MarkdownRemark' && configuredProjects.includes(getNode(node.parent).sourceInstanceName)) {
    const sectionName = node.frontmatter.section

    // If section does not exist in frontmatter we just return
    if (!sectionName) {
      return
    }

    const { projectName, projectId } = getProjectInfo(getNode(node.parent))

    projectNode = getNode(projectId)
    sectionNode = getNode(
      SectionNode({ name: sectionName, project: projectName }).id
    )

    if (sectionNode) {
      // ProjectNode and SectionNode exist
      addChildNode(sectionNode, node, 'docs')
    } else if (!projectNode) {
      // We have to create both
      sectionNode = createSectionNode(
        sectionName,
        projectName,
        node,
        createNode
      )
      projectNode = createProjectNode(projectName, sectionNode, createNode, nodeOptions)
    } else {
      // ProjectNode exists
      sectionNode = createSectionNode(
        sectionName,
        projectName,
        node,
        createNode
      )
      addChildNode(projectNode, sectionNode, 'sections')
    }

    if (!node.frontmatter.locale) {
      node.frontmatter.locale = defaultLangKey;
    }
    const nodeLocale = node.frontmatter.locale;
    const localeSlugPrefix = nodeLocale === defaultLangKey && !prefixDefaultLangKey ? '' : `${nodeLocale}/`;
    // Add a slug as the TOC creation requires that (for linking)
    node.slug = slugify(node.frontmatter.title, { lower: true })
    // Slug for the actual page
    createNodeField({
      node,
      name: 'slug',
      value: `/${localeSlugPrefix}${projectNode.slug}/${sectionNode.slug}-${node.slug}`,
    })

    const editUrl = getNodeEditUrl(getNode(node.parent))
    createNodeField({
      node,
      name: 'editUrl',
      value: editUrl,
    })
    node.editUrl = editUrl

    const docLocaleField = nodeLocale ? nodeLocale : defaultLangKey;
    createNodeField({
      node,
      name: 'locale',
      value: docLocaleField,
    })
    node.locale = docLocaleField
  }
}

const getProjectDescriptionTranslations = config =>
  config.descriptionTranslations &&
    Object.entries(config.descriptionTranslations).reduce((accumulator, [locale, description]) => {
      const descriptionTranslationsObj = {
        locale,
        description,
      };
      accumulator.push(descriptionTranslationsObj);
      return accumulator;
    }, []);

const getProjectSectionTranslations = config =>
  config.sectionTranslations &&
    Object.entries(config.sectionTranslations).reduce((accumulator, [locale, sectionOrder]) => {
      const sectionTranslationsObj = {
        locale,
        sectionOrder: sectionOrder.map(section => slugify(section, { lower: true })),
      };
      accumulator.push(sectionTranslationsObj);
      return accumulator;
    }, []);

function getProjectInfo(parent) {
  const projectName = parent.sourceInstanceName
  const projectId = ProjectNode({ name: projectName }).id
  return { projectName, projectId }
}

function getNodeEditUrl(parent) {
  // github sourced
  if(parent && parent.githubEditPath) {
    return `https://github.com/${parent.githubEditPath}`
  }
  // filesystem sourced - assume master branch
  const projectName = parent.sourceInstanceName
  return `https://github.com/JoinColony/${projectName}/edit/master/docs/${parent.relativePath}`
}

exports.createPages = ({ graphql, actions }, nodeOptions) => {
  const { createPage } = actions
  return graphql(nodeQuery).then(({ data }) => {
    data.projects.edges.forEach(({ node: project }) => {
      project.sections && project.sections.forEach(section => {
        section.docs.forEach(doc => {
          createDocPage(project, section, doc, createPage, nodeOptions)
        })
      })
    })
    return null;
  })
}

function createSectionNode(name, project, docNode, createNode) {
  const sectionNode = SectionNode({
    name,
    project,
    slug: slugify(name, { lower: true }),
  })
  addChildNode(sectionNode, docNode, 'docs')
  createNode(sectionNode)
  return sectionNode
}

function createProjectNode(name, sectionNode, createNode, { slugPrefix }) {
  const slug = slugPrefix
    ? `${slugPrefix}/${slugify(name, { lower: true })}`
    : `${slugify(name, { lower: true })}`;
  const projectNode = ProjectNode({
    name,
    slug,
  })
  if (sectionNode) addChildNode(projectNode, sectionNode, 'sections')
  createNode(projectNode)
  return projectNode
}

function createDocPage(project, section, doc, createPage, { langConfig: { langs: configuredLocales }, slugPrefix }) {
  const { fields: { slug }, frontmatter: { locale: docLocale } } = doc;
  if (!docLocale || configuredLocales.includes(docLocale)) {
    createPage({
      // TODO: define own layout page?
      path: slug,
      component: path.resolve(__dirname, '..', '..', 'src', 'modules', 'pages', 'components', 'DocPage', 'DocPage.jsx'),
      context: {
        docId: doc.id,
        projectName: project.name,
        slugPrefix,
      },
    })
  }
}

function addChildNode(parent, child, name) {
  const children = `${name}___NODE`
  if (!parent[children]) {
    parent[children] = []
  }
  // If the node is already a child we don't want to add it (required for live-reloading)
  if (parent[children].indexOf(child.id) >= 0) {
    return
  }
  parent[children].push(child.id)
}

const DescriptionTranslationType = new GraphQLObjectType({
  name: 'DescriptionTranslation',
  fields: {
    locale: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const SectionTranslationType = new GraphQLObjectType({
  name: 'SectionTranslation',
  fields: {
    locale: { type: GraphQLString },
    sectionOrder: { type: new GraphQLList(GraphQLString) }
  },
});

exports.setFieldsOnGraphQLNodeType = ({
  type
}) => {
  if (type.name === 'Project') {
    return {
      descriptionTranslations: {
        type: new GraphQLList(DescriptionTranslationType),
        description: 'Add project description translations.',
      },
      sectionTranslations: {
        type: new GraphQLList(SectionTranslationType),
        description: 'Add section order for other locales for each project.',
      },
    };
  }
  return {};
}
