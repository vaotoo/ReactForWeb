import React from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import MenuCompt from '@components/Menu/MenuComponent';
import { MenuList } from './menuList';
import style from './header.less';

interface IPageHeaderProps { }

interface IPageHeaderState { }

class PageHeaderComponent extends React.Component<IPageHeaderProps, IPageHeaderState> {
    constructor(props: IPageHeaderProps, context?: any) {
        super(props, context);
    }

    public componentWillUnmount() {
        this.setState = (): void => undefined;
    }

    public render(): React.ReactNode {
        return (
            <div className={style.pageHeaderContent}>
                <Link to="/" className={style.logoLink}>
                    <div className={style.logo}>
                        <span>AUI</span>
                        <span className={style.logoDesc}>控制台</span>
                    </div>
                </Link>
                <MenuCompt
                    menuList={MenuList}
                    useMatchPath={true}
                    useMatchPathDeep={3}
                    className={style.pageHeaderMenu}
                />
                <div className={style.logout}>
                    <Link to="/logout">
                        <Icon type="logout" />注销
                    </Link>
                </div>
            </div>
        );
    }
}

export default PageHeaderComponent;
