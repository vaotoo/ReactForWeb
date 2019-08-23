import React from 'react';
import withRouter from 'umi/withRouter';
import { IGlobalInterface } from '@utils/GlobalInterface';
import Header from './header/Header';
import style from './SecondPage.less';

interface ISecondPageProps extends IGlobalInterface { }

interface ISecondPageState { }

class SecondPageComponent extends React.Component<ISecondPageProps, ISecondPageState> {
    constructor(props: ISecondPageProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.pageContent}>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(SecondPageComponent);
