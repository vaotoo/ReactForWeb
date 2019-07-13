import { Bind } from 'lodash-decorators';
import { ILoadMapProps, IMAPConf } from './LoadMap';

export default class MapUtil {
    private props: ILoadMapProps;
    private mapUILoadKey: string;

    /**
     * 地图组件配置
     */
    private MAPConf: IMAPConf = {
        MAP: {},
        MAPID: '',
        AMap: {},
        AMapUI: {},
        MapData: [],
        AMapUIIns: {}
    };

    /**
     * 心跳计时器
     */
    private HeartbeatTimer: NodeJS.Timeout | undefined;

    /**
     * 心跳计数器
     */
    private HeartbeatCount: number = 0;

    /**
     * 地图API配置
     */
    private MAPConfig: any = {
        zoom: 8,
        scrollWheel: true,
        mapStyle: 'amap://styles/light',
        features: ['point', 'road']
    };

    constructor(props: ILoadMapProps) {
        this.props = props;
        this.mapUILoadKey = this.props.mapUILoad.replace(/\//g, '');
        this.MAPConf.AMap = window['AMap'];
        this.MAPConf.MAPID = props.mapId || '';
        this.MAPConf.AMapUI = window['AMapUI'];
        this.MAPConfig = Object.assign({}, this.MAPConfig, this.props.mapConfig || {});
        this.MAPConf.MAP = new this.MAPConf.AMap.Map(this.props.mapId, this.MAPConfig);
        this.loadAMapUI();
    }

    /**
     * 加载AMapUI
     */
    @Bind()
    private loadAMapUI(): void {
        window[this.mapUILoadKey] ?
            this.triggerMapOnLoad() :
            this.MAPConf.AMapUI.load([this.props.mapUILoad, 'lib/$'], (AMapUIIns: any) => {
                window[this.mapUILoadKey] = AMapUIIns;
                this.insHeartbeat();
            });
    }

    /**
     * AMapUIIns实例检测
     */
    @Bind()
    private insHeartbeat(): void {
        this.HeartbeatCount++;
        const AMapUIIns = window[this.mapUILoadKey];
        if (AMapUIIns) {
            this.HeartbeatTimer && clearTimeout(this.HeartbeatTimer);
            if (!AMapUIIns.supportCanvas) {
                console.log('当前环境不支持 Canvas！');
            } else {
                this.triggerMapOnLoad();
            }
        } else if (this.HeartbeatCount > 50) {
            this.HeartbeatCount = 0;
            this.HeartbeatTimer && clearTimeout(this.HeartbeatTimer);
            this.loadAMapUI();
        } else {
            this.HeartbeatTimer = setTimeout(() => {
                this.insHeartbeat();
            }, 30);
        }
    }

    @Bind()
    private triggerMapOnLoad(): void {
        if (this.props.mapOnLoad) {
            this.MAPConf.AMapUIIns = window[this.mapUILoadKey];
            this.MAPConf.MapData = this.props.mapData;
            this.props.mapOnLoad(this.MAPConf);
        }
    }
}
