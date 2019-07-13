import React from 'react';
import BannerAnim from 'rc-banner-anim';
import { ElementNode } from './element/element';
import { ElementList, IElementConf } from './element/elementConf';
import style from './banner.less';

class BannerComponent extends React.Component {
    private executeElement(): React.ReactNode[] {
        return ElementList.map((item: IElementConf, index: number) => ElementNode(item, index));
    }

    public render() {
        return (
            <BannerAnim
                arrow={false}
                autoPlay={true}
                autoPlaySpeed={6000}
                prefixCls={style.banner}
            >
                {this.executeElement()}
            </BannerAnim>
        );
    }
}

export default BannerComponent;
