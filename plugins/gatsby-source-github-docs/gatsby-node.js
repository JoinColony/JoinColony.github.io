/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const rp = require('request-promise-native')
const slugify = require('slugify')
const RawDocNode = require('./nodes/raw-doc')
const AssetFile = require('./nodes/asset-file')

const generateQueries = projects => {
  // TODO: Get latest version
  // Eventually we'd want to support multiple versions as well
  return projects.map(repo => ({
    meta: repo,
    query: `
        query {
          repository(name: "${repo.repo}", owner: "${repo.owner}") {
            name
            object(expression: "${repo.expression}") {
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Blob {
                      text
                    }
                    ... on Tree {
                      entries {
                        name
                        oid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
  }))
}

const generateRequests = ({ projects, githubAccessToken }) => {
  return generateQueries(projects).map(async ({ query, meta }) => {
    const request = {
      method: 'POST',
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        'User-Agent': 'Request-Promise',
      },
      body: {
        query: query,
      },
      json: true,
    }
    return {
      response: await rp(request),
      meta,
    }
  })
}

exports.sourceNodes = async (
  { actions, loadNodeContent },
  options
) => {
  if (!options.githubAccessToken)
    throw new Error('GitHub access token not defined!')
  const { createNode, createParentChildLink } = actions
  const results = await Promise.all(generateRequests(options))
  results.forEach(project => {
    const { repository } = project.response.data
    const { meta } = project
    const config = repository.object.entries.find(file => file.name === 'doc.config.json')
    if (!config) {
      throw new Error(`No config file found for project ${meta.name}`)
    }
    createNode(AssetFile({
      name: config.name,
      base: config.name,
      relativePath: config.name,
      sourceInstanceName: meta.name,
      meta: {
        oid: config.oid,
        content: config.object.text,
      },
    }))
    repository.object.entries
      .filter(file => file.name.endsWith('.md'))
      .filter(file => file.name.startsWith('_'))
      .forEach(file => {
        const loc = meta.expression.split(':')
        const branch = loc[0]
        const rootDir = loc[1]
        const node = {
          name: file.name,
          sourceInstanceName: meta.name,
          object: file.object,
          githubEditPath: path.join(
            meta.owner,
            meta.repo,
            'edit',
            branch,
            rootDir,
            file.name,
          ),
        }
        createNode(RawDocNode(node))
      })
    repository.object.entries
      .filter(file => file.type === 'tree')
      .forEach(dir => {
        dir.object.entries.forEach(file => {
          const loc = meta.expression.split(':')
          const branch = loc[0]
          const rootDir = loc[1]
          const node = {
            name: file.name,
            base: file.name,
            relativePath: path.join(dir.name, file.name),
            sourceInstanceName: meta.name,
            githubPath: path.join(
              meta.owner,
              meta.repo,
              'raw',
              branch,
              rootDir,
              dir.name,
              file.name,
            ),
            meta: {
              oid: file.oid,
            },
          }
          createNode(AssetFile(node))
        })
      })
  })
}

exports.setFieldsOnGraphQLNodeType = require(`./extend-file-node`)
