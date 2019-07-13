import React from 'react';
import Item1 from './item/item1';
import Item2 from './item/item2';
import Item3 from './item/item3';
import Item4 from './item/item4';
import style from './product.less';

interface IWelcomeProps { }

interface IWelcomeState { }

class ProductComponent extends React.Component<IWelcomeProps, IWelcomeState> {
    constructor(props: IWelcomeProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.productContent}>
                <Item1 />
                <Item2 />
                <Item3 />
                <Item4 />
            </div>
        );
    }
}

export default ProductComponent;
