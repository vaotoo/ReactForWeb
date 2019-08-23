import React from 'react';
import Item1 from './item/Item1';
import Item2 from './item/Item2';
import Item3 from './item/Item3';
import Item4 from './item/Item4';
import style from './Product.less';

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
