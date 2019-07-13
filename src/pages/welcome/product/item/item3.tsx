import React from 'react';
import style from '../product.less';

class ItemComponent extends React.Component {
    constructor(props: any, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.productItem}>
                <div className={style.itemTitle} style={{ textAlign: 'right' }}>
                    不懂技术，也可轻松搞定数据处理
                </div>
                <div className={style.itemDesc} style={{ textAlign: 'right' }}>
                    不用写函数，也不用写SQL，拖拽即可完成多表关联、追加合并等操作。<br />
                    很轻松实现数据清洗、处理，你也可以是数据专家。
                </div>
                <div className={style.itemImage} style={{ textAlign: 'left' }}>
                    <img src={require('../img/item2.png')} />
                </div>
            </div>
        );
    }
}

export default ItemComponent;
