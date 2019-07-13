import { IMAPConf } from '@components/LoadMap/LoadMap';

/**
 * 创建地图
 * @param props
 */
export default class CreateMap {
    private props: IMAPConf;
    private PathSimplifierIns: any;
    private Colors: string[] = ['#0066cc', '#333333', '#ffff00'];
    private LngLatList: any[] = [];

    constructor(props: IMAPConf) {
        this.props = props;
        this.exePathSimplifier();
    }

    /**
     * exePathSimplifier
     * @param props
     */
    private exePathSimplifier(): void {
        this.PathSimplifierIns = new this.props.AMapUIIns({
            zIndex: 100,
            map: this.props.MAP,
            getPath: (pathData: any) => pathData.path,
            getHoverTitle: () => '',
            renderOptions: {
                pathLineStyle: {
                    dirArrowStyle: true
                },
                getPathStyle: (pathItem: any, zoom: number) => ({
                    pathLineStyle: {
                        strokeStyle: this.Colors[0],
                        lineWidth: 10
                    },
                    pathLineSelectedStyle: {
                        lineWidth: 10
                    },
                    pathNavigatorStyle: {
                        fillStyle: this.Colors[1]
                    }
                })
            }
        });

        // 组装数据
        this.props.MapData.map((item: any, index: number) => {
            item.lng && item.lat && this.LngLatList.push([item.lng, item.lat]);
        });

        this.LngLatList.length && this.createPathNavigator();
    }

    /**
     * 创建导航轨迹
     */
    private createPathNavigator(startindex?: number): void {
        // 路线导航数据
        this.PathSimplifierIns.setData([{ path: this.LngLatList }]);

        const content = this.props.AMapUIIns.Render.Canvas.getImageContent('/img/map-car.png', (): void => {
            this.PathSimplifierIns.renderLater();
        });

        // 路线导航设置
        this.PathSimplifierIns.createPathNavigator(0, {
            loop: false,
            speed: 100,
            pathNavigatorStyle: {
                width: 20,
                height: 40,
                content: content,
                pathLinePassedStyle: {
                    lineWidth: 10,
                    strokeStyle: this.Colors[1],
                    dirArrowStyle: {
                        stepSpace: 15,
                        strokeStyle: this.Colors[2]
                    }
                }
            }
        }).start(startindex || 0);
    }

    /**
     * 重新播放导航
     */
    public replayMap(): void {
        this.createPathNavigator();
    }
}
