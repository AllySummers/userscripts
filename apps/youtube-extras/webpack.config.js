const { merge } = require('webpack-merge');

/**
 * @param {import('webpack').Configuration} config
 * @param {{ configuration?: string; options: import('@nrwl/node/src/utils/types').NormalizedBuildNodeBuilderOptions; }} context
 */
module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.svg/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [],
  });
};
