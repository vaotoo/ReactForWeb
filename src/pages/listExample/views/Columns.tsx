import React from 'react';
import { Popconfirm } from 'antd';
import style from './List.less';

export const UserColumns = (onConfirm: any): any[] => {
    return [{
        title: '系统名称',
        dataIndex: 'systemName',
        render: (text: string) => <a href="javascript:;">{text}</a>
    }, {
        title: '管理员',
        dataIndex: 'administrator'
    }, {
        title: '创建时间',
        dataIndex: 'createTime'
    }, {
        title: '操作',
        dataIndex: 'userType',
        render: (text: string, record: any) => (
            <span className={style.operation}>
                <a
                    href="javascript:;"
                    onClick={onConfirm.bind(null, record)}
                >
                    修改
                </a>
                <Popconfirm
                    okText="确定"
                    cancelText="取消"
                    title="确定要删除？"
                    onConfirm={onConfirm.bind(null, record)}
                >
                    <a href="javascript:;">删除</a>
                </Popconfirm>
            </span>
        )
    }];
};
