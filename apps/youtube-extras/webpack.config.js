const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackUserscript = require('webpack-userscript');
// NormalizedBuildNodeBuilderOptions
/**
 * @param {import('webpack').Configuration} config
 * @param {{ configuration?: string; options: import('@nrwl/node/src/utils/types').NormalizedBuildNodeBuilderOptions; }} context
 */
module.exports = (config, context) =>
  merge(config, {
    module: {
      rules: [
        {
          test: /\.svg/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [
      new WebpackUserscript({
        headers: {
          description: 'Add extras to YouTube player',
          match: [
            'http://www.youtube.com/watch?*',
            'https://www.youtube.com/watch?*',
          ],
        },
        renameExt: false,
      }),
      // new (class SvgFixPlugin {
      //   /**
      //    *
      //    * @param {webpack.Compiler} compiler
      //    */
      //   apply(compiler) {
      //     compiler.hooks.compilation.tap(
      //       {
      //         name: 'SVG',
      //       },
      //       (compilation, params) => {
      //         console.log(compilation, params);
      //       }
      //     );
      //   }
      // })(),
    ],
  });
