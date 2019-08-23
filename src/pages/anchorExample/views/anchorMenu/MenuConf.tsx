import React from 'react';
import { Icon } from 'antd';

const AnchorIcon = (iconType: string, title: string): React.ReactNode => {
    return (
        <span>
            <Icon type={iconType} style={{ paddingRight: 2 }} />{title}
        </span>
    );
};

export interface IAnchorMenuInfo {
    href: string;
    title: string | React.ReactNode;
    children?: IAnchorMenuInfo[];
}

export const AnchorMenu: IAnchorMenuInfo[] = [{
    href: '#database',
    title: AnchorIcon('database', '数据'),
    children: [{
        href: '#database-1',
        title: '入参配置'
    }, {
        href: '#database-2',
        title: '输出数据'
    }]
}, {
    href: '#components',
    title: AnchorIcon('appstore', '物料'),
    children: [{
        href: '#components-1',
        title: '模板创建'
    }, {
        href: '#components-2',
        title: '模板修改'
    }]
}];
