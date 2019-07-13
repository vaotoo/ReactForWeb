import { IMAPConf } from '@components/LoadMap/LoadMap';
import { MapRotation, MapRotationCur } from './mapRotation';
import style from '../map.less';

let SimpleInfoWindowIns: any;

/**
 * 创建地图
 * @param props IMAPConf
 */
export default class CreateMap {
    private props: IMAPConf;

    constructor(props: IMAPConf) {
        this.props = props;
        this.drawSimpleMarker();
    }

    /**
     * 绘制出租车图标
     */
    private drawSimpleMarker(): void {
        const data: any[] = [];
        this.props.MapData.forEach((item: any, index: number) => {
            item.lng && item.lat && data.push({
                lnglat: [item.lng, item.lat],
                style: MapRotationCur(item.direction || 0)
            });
        });

        const MassMarks = new this.props.AMap.MassMarks(data, {
            zIndex: 100,
            style: MapRotation()
        });
        MassMarks.setMap(this.props.MAP);
        MassMarks.on('mousedown', (args: any) => {
            this.exeSimpleInfoWindow(args);
        });
    }

    /**
     * 绘制窗口信息
     * @param point
     */
    private async exeSimpleInfoWindow(point: any): Promise<void> {
        this.LoadSimpleInfoWindow(() => {
            const infoWindow = new SimpleInfoWindowIns({
                infoTitle: '<b>详情</b>',
                infoBody: `<div class="${style.mapInfoBody}">坐标：${point.data.lnglat}</div>`
            });
            infoWindow.open(this.props.MAP, point.data.lnglat);
        });
    }

    /**
     * 加载组件
     * @param callback
     */
    private LoadSimpleInfoWindow(callback: any) {
        !SimpleInfoWindowIns ?
            this.props.AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
                SimpleInfoWindowIns = SimpleInfoWindow;
                callback();
            }) :
            callback();
    }
}
