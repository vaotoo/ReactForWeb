export default {
    path: '/secondPageExample',
    component: 'secondPageExample/views/secondPage',
    routes: [{
        title: '二级页面首页',
        path: '/secondPageExample',
        component: 'secondPageExample/views/index/index'
    }, {
        title: '二级页面A',
        path: '/secondPageExample/pageA',
        component: 'secondPageExample/views/pageA/pageA'
    }, {
        title: '二级页面B',
        path: '/secondPageExample/pageB',
        component: 'secondPageExample/views/pageB/pageB'
    }]
}