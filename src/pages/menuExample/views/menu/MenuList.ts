import { IMenuConf } from '@components/menu/MenuComponent';

export const MenuList: IMenuConf[] = [{
    key: '/menuExample',
    title: '菜单页面-首页',
    iconType: 'code-sandbox'
}, {
    key: '/menuExample/pageA',
    title: '菜单页面-A',
    iconType: 'code-sandbox'
}, {
    key: '/menuExample/pageB',
    title: '菜单页面-B',
    iconType: 'code-sandbox',
    children: [{
        key: '/menuExample/pageB?submenu=pageB1',
        title: '菜单页面-B1',
        iconType: 'code-sandbox'
    }, {
        key: '/menuExample/pageB?submenu=pageB2',
        title: '菜单页面-B2',
        iconType: 'code-sandbox'
    }]
}, {
    key: '/menuExample/pageC',
    title: '菜单页面-C',
    iconType: 'code-sandbox',
    children: [{
        key: '/menuExample/pageC?submenu=pageC1',
        title: '菜单页面-C1',
        iconType: 'code-sandbox'
    }, {
        key: '/menuExample/pageC?submenu=pageC2',
        title: '菜单页面-C2',
        iconType: 'code-sandbox'
    }]
}];
