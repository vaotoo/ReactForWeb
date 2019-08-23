import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Select, Icon } from 'antd';
import { IGlobalInfo } from '@globalModels/Global';
import style from './Header.less';

interface IHeaderOtherProps {
    globalInfo: IGlobalInfo;
}

interface IHeaderOtherState { }

class HeaderOtherComponent extends React.Component<IHeaderOtherProps, IHeaderOtherState> {

    constructor(props: IHeaderOtherProps, context?: any) {
        super(props, context);
    }

    private getPopupContainer(triggerNode: Element | undefined): HTMLElement {
        return triggerNode as HTMLElement;
    }

    public render(): React.ReactNode {
        return (
            <div className={style.headerOther}>
                <div className={style.headerOtherItem}>
                    <Link to="/secondPageExample" className={style.linkWorkspace}>
                        <Icon type="desktop" />二级页面
                    </Link>
                </div>
                <div className={style.headerOtherItem}>
                    <Select
                        defaultValue="zh-cn"
                        style={{ width: 100 }}
                        getPopupContainer={this.getPopupContainer}
                    >
                        <Select.Option value="zh-cn">
                            简体中文
                        </Select.Option>
                        <Select.Option value="en">
                            English
                        </Select.Option>
                    </Select>
                </div>
                <div className={style.userName}>
                    {this.props.globalInfo.userName}
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => ({ globalInfo: state.GlobalInfoModels })
)(HeaderOtherComponent);
