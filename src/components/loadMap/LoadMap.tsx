/**
 * Copyright (c) 2018-present, DiDi, Inc.
 * All rights reserved.
 *
 * @author zhao668055@126.com
 *
 */
import React from 'react';
import { LoadScript } from '@utils/LoadScript';
import MapUtil from './MapUtil';

/**
 * @description style       自定义样式
 * @description instanceKey 实例名称 说明：当所有列表中的实例全部创建后才会执行mapOnLoad
 * @description mapId       地图ID
 * @description mapSrc      地图脚本资源
 * @description mapData     地图数据
 * @description mapUILoad   地图UI组件
 * @description mapConfig   地图基础配置项
 * @description mapOnLoad   地图相关实例创建后调用
 * @see https://lbs.amap.com/api/javascript-api/reference/core 地图基础类文档
 * @see https://lbs.amap.com/api/javascript-api/reference/map  地图Map类文档 mapConfig配置可参考此文档
 */
export interface ILoadMapProps {
    style?: React.CSSProperties;
    instanceKey?: string[];
    mapId?: string;
    mapSrc?: string[];
    mapData: any[];
    mapUILoad: string;
    mapConfig?: any;
    mapOnLoad?(MAPConf: IMAPConf): void;
}

/**
 * @description MAP
 * @description MAPID
 * @description AMap
 * @description AMapUI
 * @description MapData
 * @description AMapUIIns
 */
export interface IMAPConf {
    MAP: any;
    MAPID: string;
    AMap: any;
    AMapUI: any;
    MapData: any;
    AMapUIIns: any;
}

enum MapSource {
    AmapCore = '//webapi.amap.com/maps?v=1.4.14&key=788e08def03f95c670944fe2c78fa76f&plugin=AMap.PolyEditor',
    AmapUI = '//webapi.amap.com/ui/1.0/main.js?v=1.0.11'
}

/**
 * 地图API
 */
export default class LoadMapComponent extends React.Component<ILoadMapProps> {
    private HeartbeatCount: number = 0;
    private HeartbeatMax: number = 30;
    private HeartbeatTim: number = 10;

    constructor(props: ILoadMapProps, context?: any) {
        super(props, context);
    }

    /**
     * 监听AmapUI
     */
    private checkAmapUIIns(): void {
        this.HeartbeatCount++;
        if (this.HeartbeatCount > this.HeartbeatMax) {
            this.HeartbeatCount = 0;
            this.loadAmapCore();
        } else {
            let insTotal: number = 0;
            const insList: string[] = this.props.instanceKey || ['AMapUI'];

            insList.forEach((insKey: string) => {
                window[insKey] && insTotal++;
            });

            insTotal === insList.length ? new MapUtil(this.props) : setTimeout(() => {
                this.checkAmapUIIns();
            }, this.HeartbeatTim);
        }
    }

    /**
     * 加载UI组件库
     */
    private loadAmapUI(): void {
        LoadScript({
            src: MapSource.AmapUI,
            onLoad: () => { this.checkAmapUIIns(); }
        });
    }

    /**
     * 监听AMap
     */
    private checkAmapIns(): void {
        if (window['AMap'] && window['AMap']['UA'] && window['AMap']['PolyEditor']) {
            this.loadAmapUI();
        } else {
            setTimeout(() => { this.checkAmapIns(); }, this.HeartbeatTim);
        }
    }

    /**
     * 加载地图core文件
     */
    private loadAmapCore(): void {
        LoadScript({
            src: MapSource.AmapCore,
            onLoad: () => { this.checkAmapIns(); }
        });
    }

    public componentWillReceiveProps(nextProps: ILoadMapProps): void {
        nextProps.mapData !== this.props.mapData && new MapUtil(nextProps);
    }

    public componentDidMount(): void {
        this.loadAmapCore();
    }

    public render(): React.ReactNode {
        return (
            <div
                className="LoadMap"
                style={Object.assign({ height: '100%' }, this.props.style || {})}
                id={this.props.mapId || 'LoadMap'}
            />
        );
    }
}
