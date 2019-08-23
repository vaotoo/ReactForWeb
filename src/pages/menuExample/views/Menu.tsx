import React from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { IModelsLeftMenu } from '@pages/menuExample/models/menu/LeftMenu';
import LeftMenu from './menu/LeftMenu';
import style from './Menu.less';

interface IMenuIndexProps {
    collapsed: boolean;
}

interface IMenuIndexState {
    collapsed: boolean;
}

class MenuIndexComponent extends React.Component<IMenuIndexProps, IMenuIndexState> {
    constructor(props: IMenuIndexProps, context?: any) {
        super(props, context);
        this.state = {
            collapsed: false
        };
    }

    public componentWillReceiveProps(nextProps: IMenuIndexProps): void {
        nextProps.collapsed !== this.props.collapsed && this.setState({
            collapsed: nextProps.collapsed
        });
    }

    public render(): React.ReactNode {
        return (
            <div className={style.indexContent}>
                <LeftMenu />
                <div
                    className={[
                        style.indexPanel,
                        this.state.collapsed ? style.indexCollapsed : ''
                    ].join(' ')}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(
    connect(
        (state: any): IModelsLeftMenu => ({
            collapsed: state.menuExample_models_menu_leftMenu.collapsed
        })
    )(MenuIndexComponent)
);
