import React from 'react';
import { connect } from 'dva';
import { Bind } from 'lodash-decorators';
import MenuCompt from '@components/Menu/MenuComponent';
import { IGlobalInterface } from '@utils/GlobalInterface';
import { MenuList } from './menuList';
import style from './leftMenu.less';

interface ILeftMenuProps extends IGlobalInterface {
}

interface ILeftMenuState {
    collapsed: boolean;
}

class LeftMenuComponent extends React.Component<ILeftMenuProps, ILeftMenuState> {
    constructor(props: ILeftMenuProps, context?: any) {
        super(props, context);
        this.state = {
            collapsed: false
        };
    }

    @Bind()
    private onCollapsed(collapsed: boolean): void {
        this.setState({
            collapsed: collapsed
        }, () => {
            // 调起收缩按钮状态改变
            this.props.dispatch({
                type: 'menuExample_models_menu_leftMenu/changeCollapsed',
                collapsed: collapsed
            });
        });
    }

    public render(): React.ReactNode {
        return (
            <div
                className={[
                    style.leftMenuContent,
                    this.state.collapsed ? style.leftMenuCollapsed : ''
                ].join(' ')}
            >
                <MenuCompt
                    menuMode="inline"
                    menuList={MenuList}
                    className={style.leftMenu}
                    useCollaps={true}
                    useMatchPath={true}
                    useMatchSearch={true}
                    useMatchPathDeep={3}
                    onCollapsed={this.onCollapsed}
                />
            </div>
        );
    }
}

export default connect()(LeftMenuComponent);
