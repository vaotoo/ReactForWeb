import { IMenuConf } from '@components/Menu/MenuComponent';

export const MenuList: IMenuConf[] = [{
    key: '/',
    title: '首页',
    iconType: 'home'
}, {
    key: '/menuExample',
    title: '菜单栏',
    iconType: 'layout'
}, {
    key: '/anchorExample',
    title: '锚点选择',
    iconType: 'appstore'
}, {
    key: '/listExample',
    title: '列表',
    iconType: 'ordered-list'
}, {
    key: '/chartExample',
    title: '数据可视化',
    iconType: 'pie-chart'
}, {
    key: '/mapExample',
    title: '地图可视化',
    iconType: 'global'
}, {
    key: '/emptyExample',
    title: '空白页',
    iconType: 'file'
}];
