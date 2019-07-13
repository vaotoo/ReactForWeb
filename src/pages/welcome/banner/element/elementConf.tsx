export interface IElementConf {
    title: string;
    desc: string;
    banner: string;
    background: string;
    link: IElementLinkConf;
}

interface IElementLinkConf {
    to: string;
    title: string;
}

export const ElementList: IElementConf[] = [{
    title: '快速搭建一站式数据平台',
    desc: '提供灵活、易用、高性能的可视化分析能力，轻松完成自助式数据处理',
    banner: require('../image/banner1.png'),
    background: '#4481EB',
    link: {
        to: '/listExample',
        title: '即刻体验'
    }
}, {
    title: '1分钟搞定可视化分析',
    desc: '无需编程，拖拽即生成数据图表。不懂技术，也可轻松搞定数据处理',
    banner: require('../image/banner2.png'),
    background: '#00C5C8',
    link: {
        to: '/listExample',
        title: '即刻体验'
    }
}];
