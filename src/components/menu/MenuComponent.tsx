/**
 * Copyright (c) 2018-present, DiDi, Inc.
 * All rights reserved.
 *
 * @author zhao668055@126.com
 *
 */
import React from 'react';
import Link from 'umi/link';
import { Menu, Icon, Button } from 'antd';
import { SelectParam, MenuMode, MenuProps } from 'antd/lib/menu';
import { Bind } from 'lodash-decorators';
import style from './MenuComponent.less';

/**
 * @description className         自定义样式名称
 * @description menuList          菜单数据
 * @description menuMode          菜单模式
 * @description useCollaps        启用抽屉效果
 * @description useMatchPath      启用地址栏路由匹配
 * @description useMatchPathDeep  路由匹配深度(useMatchPath=true生效)
 * @description useMatchPathByKey 路由匹配按指定key匹配高亮(适用于其他菜单中的二级路由要跟头部以及路由管理，优先级高于useMatchPathDeep)
 * @description useMatchSearch    启用地址栏参数匹配
 * @description defaultSelected   默认选中
 * @description onCollapsed       抽屉效果回调
 * @description onMenuChange      菜单更改回调
 */
interface IMenuProps {
    className: string;
    menuList: IMenuConf[];
    menuMode?: MenuMode;
    useCollaps?: boolean;
    useMatchPath?: boolean;
    useMatchPathDeep?: number;
    useMatchPathByKey?: string[];
    useMatchSearch?: boolean;
    defaultSelected?: string;
    onCollapsed?(collapsed: boolean): void;
    onMenuChange?(selectedKeys: string[]): void;
}

interface IMenuState {
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
}

export interface IMenuConf {
    key: string;
    title: string;
    hidden?: boolean;
    iconType?: string;
    children?: IMenuConf[];
}

class MenuComponent extends React.Component<IMenuProps, IMenuState> {
    private popupElement: HTMLElement | undefined;
    private collapsedOpenKeys: string[] = [];

    constructor(props: IMenuProps, context?: any) {
        super(props, context);
        this.state = {
            collapsed: false,
            openKeys: [this.props.defaultSelected || location.pathname],
            selectedKeys: [this.props.defaultSelected || this.executeLocationPath()]
        };
    }

    @Bind()
    private setPopupContainer(element: HTMLDivElement | null): void {
        this.popupElement = element as HTMLDivElement;
    }

    @Bind()
    private getPopupContainer(): HTMLElement {
        return this.popupElement as HTMLElement;
    }

    /**
     * 菜单选择
     */
    @Bind()
    private menuSelect(param: SelectParam): void {
        this.setState({
            selectedKeys: param.selectedKeys,
            openKeys: [param.selectedKeys[0].split('?')[0]]
        }, () => {
            typeof this.props.onMenuChange === 'function' &&
                this.props.onMenuChange(this.state.selectedKeys);
        });
    }

    /**
     * 组装菜单
     */
    @Bind()
    private executeMenu(menuList: IMenuConf[]): React.ReactNode[] {
        const nodeList: React.ReactNode[] = [];

        menuList.forEach((item: IMenuConf) => {
            switch (item.children) {
                case undefined:
                    !item.hidden && nodeList.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                {item.iconType ? <Icon type={item.iconType} /> : ''}
                                {item.title}
                            </Link>
                        </Menu.Item>
                    );
                    break;
                default:
                    !item.hidden && nodeList.push(
                        <Menu.SubMenu
                            key={item.key}
                            title={
                                <span>
                                    {item.iconType ? <Icon type={item.iconType} /> : ''}
                                    {item.title}
                                </span>
                            }
                        >
                            {this.executeMenu(item.children)}
                        </Menu.SubMenu>
                    );
                    break;
            }
        });

        return nodeList;
    }

    /**
     * 处理地址栏选择
     */
    @Bind()
    private executeLocationPath(): string {
        const locnPath: string = location.pathname + (this.props.useMatchSearch ? location.search : '');
        let pathName: string = locnPath;

        this.props.useMatchPath && !this.props.useMatchSearch &&
            (pathName = `/${
                locnPath
                    .split('/')
                    .slice(1, this.props.useMatchPathDeep || 2)
                    .join('/')
                }`);

        this.props.useMatchPathByKey && this.props.useMatchPathByKey.forEach((value: string) => {
            pathName.indexOf(value) > -1 && (pathName = value);
        });

        return pathName;
    }

    /**
     * 菜单栏收缩
     */
    @Bind()
    private toggleCollapsed(): void {
        const isCollapsed: boolean = !this.state.collapsed;
        this.state.openKeys.length && (this.collapsedOpenKeys = this.state.openKeys);
        this.setState({
            collapsed: isCollapsed,
            openKeys: isCollapsed ? [] : this.collapsedOpenKeys
        }, () => {
            typeof this.props.onCollapsed === 'function' &&
                this.props.onCollapsed(this.state.collapsed);
        });
    }

    /**
     * 菜单栏打开更改
     */
    @Bind()
    private onOpenChange(openKeys: string[]): void {
        openKeys.length && this.state.collapsed && (this.collapsedOpenKeys = openKeys);
        const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : []
        });
    }

    /**
     * 组装菜单栏配置项
     */
    @Bind()
    private executeMenuOptions(): MenuProps {
        const menuConfig: MenuProps = {
            className: style.menuBox,
            mode: this.props.menuMode || 'horizontal',
            selectedKeys: this.state.selectedKeys,
            defaultSelectedKeys: this.state.selectedKeys,
            openKeys: this.state.openKeys,
            defaultOpenKeys: this.state.openKeys,
            onSelect: this.menuSelect,
            onOpenChange: this.onOpenChange
        };

        menuConfig.mode === 'inline' &&
            (menuConfig.inlineCollapsed = this.state.collapsed);

        return menuConfig;
    }

    /**
     * 处理地址栏回退
     * @param prevProps
     * @param prevState
     */
    public componentDidUpdate(prevProps: IMenuProps, prevState: IMenuState) {
        if (!this.state) { return; }

        const prevPath: string = prevState.selectedKeys[0];
        const currPath: string = this.state.selectedKeys[0];
        const pathName: string = this.executeLocationPath();

        prevPath === currPath && pathName !== currPath && this.setState({
            selectedKeys: [pathName]
        }, () => {
            typeof this.props.onMenuChange === 'function' &&
                this.props.onMenuChange(this.state.selectedKeys);
        });
    }

    public componentWillUnmount() {
        this.setState = (): void => undefined;
    }

    public render(): React.ReactNode {
        return (
            <div
                ref={this.setPopupContainer}
                className={[
                    style.menuBox,
                    this.props.className || '',
                    this.state.collapsed ? style.menuCollapsed : ''
                ].join(' ')}
            >
                {
                    this.props.useCollaps ?
                        <Button onClick={this.toggleCollapsed} className={style.collapsButton}>
                            <Icon type={this.state.collapsed ? 'caret-right' : 'caret-left'} />
                        </Button> : ''
                }
                <Menu
                    {...this.executeMenuOptions()}
                    getPopupContainer={this.getPopupContainer}
                >
                    {this.executeMenu(this.props.menuList)}
                </Menu>
            </div>
        );
    }
}

export default MenuComponent;
