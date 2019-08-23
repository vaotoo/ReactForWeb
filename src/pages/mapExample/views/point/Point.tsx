import React from 'react';
import LoadMap from '@components/loadMap/LoadMap';
import CreateMap from './MapUtil';
import { MapData } from './MapData';
import style from '../Map.less';

interface IPointProps { }

interface IPointState { }

class PointComponent extends React.Component<IPointProps, IPointState> {
    constructor(props: IPointProps, context?: any) {
        super(props, context);
    }

    private mapOnLoad(props: any): void {
        new CreateMap(props);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.mapPanel}>
                <LoadMap
                    mapId="yourMapId"
                    mapOnLoad={this.mapOnLoad}
                    mapUILoad="ui/misc/PointSimplifier"
                    mapData={MapData}
                    mapConfig={{
                        center: [MapData[0].lng, MapData[0].lat],
                        scrollWheel: false
                    }}
                />
            </div>
        );
    }
}

export default PointComponent;
