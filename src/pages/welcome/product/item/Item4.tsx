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
                    无需编程，拖拽即生成数据图表
                </div>
                <div className={style.itemDesc}>
                    拖拽瞬间生成数据图表，几十种酷炫的可视化图表任你挑。<br />
                    图文混排，让你的数据报表图文并茂。
                </div>
                <div className={style.itemImage}>
                    <img src={require('../img/item3.png')} />
                </div>
            </div>
        );
    }
}

export default ItemComponent;
