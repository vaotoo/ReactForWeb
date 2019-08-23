/**
 * Copyright (c) 2018-present, DiDi, Inc.
 * All rights reserved.
 *
 * @author zhao668055@126.com
 *
 */
import React from 'react';
import { Icon } from 'antd';

/**
 * Loading
 */
export default class LoadingComponent extends React.Component {
    public render(): React.ReactNode {
        return (
            <div
                style={{
                    color: '#ccc',
                    height: 360,
                    lineHeight: '360px',
                    margin: 'auto',
                    textAlign: 'center'
                }}
            >
                <Icon
                    type="loading"
                    style={{
                        fontSize: 28,
                        verticalAlign: 'middle'
                    }}
                />
                <span
                    style={{
                        fontSize: 18,
                        paddingLeft: 10,
                        verticalAlign: 'middle'
                    }}
                >
                    加载中...
                </span>
            </div>
        );
    }
}
