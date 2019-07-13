import React from 'react';
import { Tabs } from 'antd';
import Point from './point/point';
import Path from './path/path';
import style from './map.less';

interface IMapProps { }

interface IMapState { }

class MapComponent extends React.Component<IMapProps, IMapState> {
    constructor(props: IMapProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <Tabs className={style.mapContent} type="card">
                <Tabs.TabPane tab="海量点效果" key="1">
                    <Point />
                </Tabs.TabPane>
                <Tabs.TabPane tab="导航效果" key="2">
                    <Path />
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default MapComponent;
