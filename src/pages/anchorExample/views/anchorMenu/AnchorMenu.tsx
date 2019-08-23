import React from 'react';
import { Anchor, Icon } from 'antd';
import { IAnchorMenuInfo, AnchorMenu } from './MenuConf';
import style from './AnchorMenu.less';

interface IAnchorMenuProps { }

interface IAnchorMenuState { }

class AnchorMenuComponent extends React.Component<IAnchorMenuProps, IAnchorMenuState> {
    constructor(props: IAnchorMenuProps, context?: any) {
        super(props, context);
    }

    private executeAnchor(menuList: IAnchorMenuInfo[]): React.ReactNode[] {
        const nodeList: React.ReactNode[] = [];
        menuList.forEach((item: IAnchorMenuInfo) => {
            if (item.children) {
                nodeList.push(
                    <Anchor.Link href={item.href} title={item.title} key={item.href}>
                        {this.executeAnchor(item.children)}
                    </Anchor.Link>
                );
            } else {
                nodeList.push(
                    <Anchor.Link href={item.href} title={item.title} key={item.href} />
                );
            }
        });
        return nodeList;
    }

    public render(): React.ReactNode {
        return (
            <div className={style.anchorMenuContent}>
                <Anchor affix={false}>
                    {this.executeAnchor(AnchorMenu)}
                </Anchor>
            </div>
        );
    }
}

export default AnchorMenuComponent;
