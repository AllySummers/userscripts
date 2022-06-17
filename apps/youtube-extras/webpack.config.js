const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

/**
 *
 * @param mod
 * @returns {mod is webpack.ExternalModule}
 */
 const isExternalModule = (mod) => mod.constructor.name === 'ExternalModule';



class SvgFixPlugin {
    /**
     *
     * @param {webpack.Compiler} compiler
     */
    apply(compiler) {
      const {webpack} = compiler;
      const {Compilation} = webpack;
      const {RawSource} = webpack.sources;

      compiler.hooks.compilation.tap('SvgFixPlugin', (compilation) => {
    

        // compilation.hooks.afterProcessAssets.tap('SvgFixPlugin', (assets) => {
        //   Object.entries(assets).forEach(([filename, source]) => {
        //     let content = source.source();

        //     if (content instanceof Buffer) {
        //       content = content.toString('utf-8')
        //     }

        //     console.log(content)
        //   })
        // })
      })

      // compiler.hooks.thisCompilation.tap('SvgFixPlugin', (compilation, params) => {
      //   compilation.hooks.processAssets.tap({
      //     name: 'SvgFixPlugin',
      //     stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
      //   }, (assets) => {
      //     console.log(assets)
      //   })
      // })
      compiler.hooks.compilation.tap('SVG', (compilation, params) => {
        compilation.hooks.buildModule.tap('SVG', (mod) => {
          if (isExternalModule(mod) && mod.userRequest.endsWith('.svg')) {
            // console.log(mod)
          }
        });
      });
    }
  }

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
    plugins: [
      // new SvgFixPlugin()
      new webpack.NormalModuleReplacementPlugin(/svg/, (resource) => {
        resource.createData.loaders = [{
          loader: 'raw-loader'
        }]
        // return false
      })
    ]
  });
};
