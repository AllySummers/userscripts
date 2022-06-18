import type { NormalizedBuildNodeBuilderOptions } from '@nrwl/node/src/utils/types';
import { validateAndStringify, isRight } from 'userscript-metadata';
import { BannerPlugin, type Configuration } from 'webpack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type _DevServer from 'webpack-dev-server';
import { merge } from 'webpack-merge';

interface Context {
  configurationName?: string;
  options: NormalizedBuildNodeBuilderOptions;
}

const bannerResult = validateAndStringify({
  name: 'YouTube Extras',
  namespace: 'http://tampermonkey.net/',
  grant: 'none',
  author: 'Me',
  version: '0.0.1',
  description: 'Add extras to YouTube player',
  match: [
    'http://www.youtube.com/watch?*',
    'https://www.youtube.com/watch?*',
    'http://youtube.com/watch?*',
    'https://youtube.com/watch?*',
  ],
  // run_at: 'document-start',
});

if (!isRight(bannerResult)) {
  console.log(bannerResult.Left);
  throw new Error('Banner broke');
}

const banner = bannerResult.Right.stringified;

module.exports = (
  { resolve: { alias, ...resolve } = {}, plugins, ...config }: Configuration,
  _: Context
): Configuration =>
  merge<Configuration>(config, {
    target: ['es2020', 'web'],
    resolve: {
      ...resolve,
      mainFields: ['es2015', 'module', 'main'],
    },
    output: {
      clean: true,
      asyncChunks: false,
      environment: {
        arrowFunction: true,
        bigIntLiteral: true,
        const: true,
        destructuring: true,
        forOf: true,
        optionalChaining: true,
        templateLiteral: true,
      },
    },
    optimization: {
      runtimeChunk: false,
      minimize: false,
      splitChunks: false,
      concatenateModules: true,
      mangleExports: false,
    },
    plugins: [
      ...(plugins ?? []).filter(
        (plugin) =>
          !['MiniCssExtractPlugin', 'IndexHtmlWebpackPlugin', 'RemoveEmptyScriptsPlugin'].includes(
            plugin.constructor.name
          )
      ),
      new BannerPlugin({
        banner,
        raw: true,
      }),
    ],
  });
