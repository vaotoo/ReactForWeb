/**
 * 代理配置
 * @see https://umijs.org/zh/config/#proxy
 * @see https://webpack.js.org/configuration/dev-server/#devserver-proxy
 */
export default {
    proxy: {
        '/api': {
            'target': 'http://110.119.120.10/',
            'changeOrigin': true,
            'pathRewrite': {
                '^/api': ''
            }
        }
    }
};