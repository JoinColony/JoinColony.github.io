exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /borc/,
            use: loaders.null(),
          },
          {
            test: /got/,
            use: loaders.null(),
          },
          {
            test: /ipld-dag-cbor/,
            use: loaders.null(),
          },
          {
            test: /scrypt/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
