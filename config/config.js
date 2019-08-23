import routesConfig from './routes.config';
import webpackConfig from './webpack.config';
import proxyConfig from './proxy.config';

/**
 * 项目配置
 * @see https://umijs.org/zh/guide/config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
 * @see https://umijs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE
 */
export default Object.assign({
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            hardSource: true,
            title: {
                defaultTitle: '请自行设置默认标题',
                separator: '-'
            },
            dva: {
                immer: true
            },
            dynamicImport: {
                webpackChunkName: true,
                loadingComponent: './components/Loading.tsx'
            }
        }]
    ]
}, routesConfig, webpackConfig, proxyConfig);