import path from 'path';

const ROOT_PATH = path.resolve(__dirname, '../');
const NODE_PATH = path.resolve(ROOT_PATH, 'node_modules');
const GroupConf = (chunkName, regExpkey, isPages) => ({
    name: chunkName,
    chunks: 'async',
    test: (module) => {
        const reg = new RegExp(`\/${isPages ? 'src\/pages' : 'node_modules'}\/${regExpkey}`);
        return reg.test(module.context);
    },
    priority: 20,
    maxAsyncRequests: 10,
    maxInitialRequests: 10,
    reuseExistingChunk: true
});

/**
 * Webpack配置
 * @see https://umijs.org/zh/config/#chainwebpack
 * @see https://github.com/neutrinojs/webpack-chain
 */
export default {
    hash: true,
    outputPath: '/dist/assets/',
    publicPath: '/assets/',
    urlLoaderExcludes: [/.svg$/],
    ignoreMomentLocale: true,
    chainWebpack(config) {
        config.merge({
            optimization: {
                splitChunks: {
                    chunks: 'async',
                    minSize: 0,
                    minChunks: 1,
                    maxAsyncRequests: 10,
                    maxInitialRequests: 10,
                    cacheGroups: {
                        antd: GroupConf('antd', 'antd'),
                        antrc: GroupConf('antrc', 'rc-.*'),
                        echarts: GroupConf('echarts', 'echarts'),
                        reactVideo: GroupConf('reactVideo', 'react-html5video'),
                        corePlugs: GroupConf('corePlugs', '(zrender.*|lodash.*|moment)'),
                        pages: GroupConf('pages', '[^fullScreen]', true)
                    }
                }
            },
            resolve: {
                alias: {
                    '@utils': path.resolve(ROOT_PATH, 'src/utils'),
                    '@pages': path.resolve(ROOT_PATH, 'src/pages'),
                    '@components': path.resolve(ROOT_PATH, 'src/components'),
                    '@globalModels': path.resolve(ROOT_PATH, 'src/models'),
                    '@globalServices': path.resolve(ROOT_PATH, 'src/services')
                }
            },
            module: {
                rule: {
                    'svg-loader': {
                        test: /\.svg$/,
                        use: {
                            'svg-inline-loader': {
                                loader: 'svg-inline-loader',
                                options: {
                                    removeTags: true
                                }
                            }
                        }
                    }
                }
            }
        });
    }
};
