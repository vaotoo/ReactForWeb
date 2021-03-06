import React from 'react';
import Banner from './banner/Banner';
import Product from './product/Product';
import style from './Welcome.less';

interface IWelcomeProps { }

interface IWelcomeState { }

class WelcomeComponent extends React.Component<IWelcomeProps, IWelcomeState> {
    constructor(props: IWelcomeProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.welcomeContent}>
                <Banner />
                <Product />
            </div>
        );
    }
}

export default WelcomeComponent;
