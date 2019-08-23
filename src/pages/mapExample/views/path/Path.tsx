import React from 'react';
import { Button } from 'antd';
import { Bind } from 'lodash-decorators';
import LoadMap from '@components/loadMap/LoadMap';
import CreateMap from './MapUtil';
import { MapData } from './MapData';
import style from '../Map.less';

interface IPathProps { }

interface IPathState { }

class PathComponent extends React.Component<IPathProps, IPathState> {
    private CreateMapIns: CreateMap | undefined;

    constructor(props: IPathProps, context?: any) {
        super(props, context);
    }

    @Bind()
    private mapOnLoad(props: any): void {
        this.CreateMapIns = new CreateMap(props);
    }

    @Bind()
    private onClick(): void {
        this.CreateMapIns && this.CreateMapIns.replayMap();
    }

    public render(): React.ReactNode {
        return (
            <div className={style.mapPanel}>
                <Button className={style.mapReplay} onClick={this.onClick}>重新导航</Button>
                <LoadMap
                    mapId="yourMapPathId"
                    mapOnLoad={this.mapOnLoad}
                    mapUILoad="ui/misc/PathSimplifier"
                    mapData={MapData}
                    mapConfig={{
                        scrollWheel: false
                    }}
                />
            </div>
        );
    }
}

export default PathComponent;
