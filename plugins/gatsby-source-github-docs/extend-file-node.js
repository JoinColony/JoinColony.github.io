const path = require('path')
const fs = require('fs')
const { GraphQLString } = require('gatsby/graphql')
const rp = require('request-promise-native')

module.exports = async ({
  type,
  getNodeAndSavePathDependency,
  pathPrefix = '',
}) => {
  if (type.name !== 'GitHubDocFile') {
    return {}
  }
  return {
    publicURL: {
      type: GraphQLString,
      args: {},
      description: 'Download file from github and save to static directory and return public url to it',
      async resolve(file) {
        const ext = path.extname(file.name)
        const fileName = `${path.basename(file.name, ext)}-${
          file.internal.contentDigest
        }${ext}`
        const subDir = path.dirname(file.relativePath)
        const publicPath = path.join(
          process.cwd(),
          'public',
          'static',
          subDir,
        )
        if (!fs.existsSync(path.join(publicPath, fileName))) {
          const contents = await rp({
            method: 'GET',
            uri: `https://github.com/${file.githubPath}`,
            encoding: null,
          })
          if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath)
          }
          fs.writeFileSync(path.join(publicPath, fileName), contents)
        }
        return `${pathPrefix}/static/${subDir}/${fileName}`
      },
    },
  }
}
