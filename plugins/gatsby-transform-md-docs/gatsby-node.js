const path = require('path')
const slugify = require('slugify')
const { ProjectNode, SectionNode } = require('./nodes')

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
              frontmatter {
                title
              }
              html
            }
          }
        }
      }
    }
  }
`

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink,
  } = boundActionCreators

  let projectNode
  let sectionNode

  if (node.base === 'doc.config.json') {
    const { projectName, projectId } = getProjectInfo(node)
    projectNode = getNode(projectId)
    if (!projectNode) {
      projectNode = createProjectNode(projectName, null, createNode)
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
    projectNode.logo = config.logo
    projectNode.logoSmall = config.logoSmall
    projectNode.description = config.description
  } else if (node.internal.type === 'MarkdownRemark') {
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
      projectNode = createProjectNode(projectName, sectionNode, createNode)
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

    // Slug for the actual page
    createNodeField({
      node,
      name: 'slug',
      value: `${projectNode.slug}/${sectionNode.slug}-${node.slug}`,
    })
    // Add a slug as the TOC creation requires that (for linking)
    node.slug = slugify(node.frontmatter.title, { lower: true })

    const editUrl = getNodeEditUrl(getNode(node.parent))
    createNodeField({
      node,
      name: 'editUrl',
      value: editUrl,
    })

    node.editUrl = editUrl
  }
}

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

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return graphql(nodeQuery).then(({ data }) => {
    data.projects.edges.forEach(({ node: project }) => {
      project.sections.forEach(section => {
        section.docs.forEach(doc => {
          createDocPage(project, section, doc, createPage)
        })
      })
    })
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

function createProjectNode(name, sectionNode, createNode) {
  const projectNode = ProjectNode({
    name,
    slug: slugify(name, { lower: true }),
  })
  if (sectionNode) addChildNode(projectNode, sectionNode, 'sections')
  createNode(projectNode)
  return projectNode
}

function createDocPage(project, section, doc, createPage) {
  const slug = `${project.slug}/${section.slug}-${doc.slug}`
  createPage({
    // TODO: define own layout page?
    path: `/${slug}`,
    component: getTemplatePath('doc-page.js'),
    context: {
      docId: doc.id,
      projectName: project.name,
    },
  })
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

function getTemplatePath(file) {
  return path.resolve(__dirname, '..', '..', 'src', 'templates', file)
}
