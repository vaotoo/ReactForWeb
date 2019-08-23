import baseRoutes from './routes/base';
import menuRoutes from './routes/menuPage';
import secondPageRoutes from './routes/secondPage';

/**
 * 路由配置
 * @see https://umijs.org/zh/config/#routes
 */
export default {
    routes: [{
        path: '/',
        component: '../layouts/index',
        routes: [
            ...baseRoutes,
            menuRoutes,
            secondPageRoutes
        ]
    }]
}