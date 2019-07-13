import React from 'react';
import { Bind } from 'lodash-decorators';
import { MenuList } from './headerMenu';
import MenuCompt from '@components/Menu/MenuComponent';
import HeaderOther from './headerOther';
import style from './header.less';

interface IHeaderProps { }

/**
 * @description unTransparent 禁用Header透明效果
 */
interface IHeaderState {
    unTransparent: boolean;
}

/**
 * window.scrollY 默认阈值
 */
const WIN_SCROLLY: number = 660;

class HeaderComponent extends React.Component<IHeaderProps, IHeaderState> {
    private scrollTimer: NodeJS.Timeout | undefined;

    constructor(props: IHeaderProps, context?: any) {
        super(props, context);
        this.state = {
            unTransparent: false
        };
    }

    /**
     * 鼠标滚动
     */
    @Bind()
    private handleScroll() {
        this.scrollTimer && clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
            this.setState({
                unTransparent: window.scrollY > WIN_SCROLLY ||
                    !/^(\/|\/template)$/.test(location.pathname)
            });
        }, 100);
    }

    public componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }

    public componentWillUnmount() {
        this.setState = (): void => undefined;
    }

    public render(): React.ReactNode {
        const unTrans: boolean = this.state.unTransparent;
        return (
            <div
                className={
                    `${unTrans ? style.headerUnTransparent : ''} ${style.headerContent}`
                }
            >
                <div className={style.headerLogo}>
                    <span style={{ color: unTrans ? '#06c' : '' }}>A</span>
                    <span style={{ color: unTrans ? '#f60' : '' }}>UI</span>
                </div>
                <MenuCompt
                    menuList={MenuList}
                    className={style.headerMenu}
                    useMatchPath={true}
                    onMenuChange={this.handleScroll}
                />
                <HeaderOther />
            </div>
        );
    }
}

export default HeaderComponent;
