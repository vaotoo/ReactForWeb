import React from 'react';
import style from '../Product.less';

class ItemComponent extends React.Component {
    constructor(props: any, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.productItem}>
                <div className={style.itemTitle}>
                    整合各类数据，全面分析业务
                </div>
                <div className={style.itemDesc}>
                    支持接入多种数据源，包括本地数据，网站统计、广告推广等各种第三方平台数据。<br />
                    同时还能连接各类数据库和同步工具。
                </div>
                <div className={style.itemImage}>
                    <img src={require('../img/item1.png')} />
                </div>
            </div>
        );
    }
}

export default ItemComponent;
