exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /got/,
            use: loaders.null(),
          },
          {
            test: /scrypt/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
