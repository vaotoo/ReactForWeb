interface IMapRotation {
    url: string;
    anchor: any;
    size: any;
    rotation: number;
}

/**
 * 方向集合 共18种
 */
const RotationList: number[] = [
    0, 20, 40, 60, 80, 100, 120, 140, 160, 180,
    200, 220, 240, 260, 280, 300, 320, 340, 360
];

/**
 * 地图标记点样式集合
 */
export const MapRotation = (): IMapRotation[] => {
    const exeRotationStyle = (url: string): IMapRotation[] => {
        const style: IMapRotation[] = RotationList.map((rotation: number) => ({
            url: url,
            anchor: {
                x: 5,
                y: 5
            },
            size: {
                width: 15,
                height: 30
            },
            retina: true,
            rotation: rotation
        }));
        return style;
    };
    return exeRotationStyle('/img/map-car.png');
};

/**
 * 当前状态样式设置
 * @param status
 * @param direction
 */
export const MapRotationCur = (direction: number): number => {
    let styleindex: number = 0;
    RotationList.find((value: number, index: number): boolean => {
        const nextValue: number = RotationList[index + 1] || RotationList[index];
        const isMatch: boolean = direction >= value && direction <= nextValue;
        isMatch && (styleindex = index);
        return isMatch;
    });
    return styleindex;
};
