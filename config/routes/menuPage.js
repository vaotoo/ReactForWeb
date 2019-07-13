export default {
    title: '菜单页示例',
    path: '/menuExample',
    component: 'menuExample/views/menu',
    routes: [{
        title: '菜单页首页',
        path: '/menuExample',
        component: 'menuExample/views/index/index'
    }, {
        title: '菜单页A',
        path: '/menuExample/pageA',
        component: 'menuExample/views/pageA/pageA'
    }, {
        title: '菜单页B',
        path: '/menuExample/pageB',
        component: 'menuExample/views/pageB/pageB'
    }, {
        title: '菜单页C',
        path: '/menuExample/pageC',
        component: 'menuExample/views/pageC/pageC'
    }]
}