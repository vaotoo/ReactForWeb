import baseRoutes from './routes/base';
import menuRoutes from './routes/menuPage';
import secondPageRoutes from './routes/secondPage';

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