import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Request from '@utils/Request';
import withRouter from 'umi/withRouter';
import { IGlobalInterface } from '@utils/GlobalInterface';
import * as IndexConf from './Index.config';
import Header from './header/Header';
import Footer from './footer/Footer';
import style from './Index.less';

/**
 * 设置全局Mseeage默认配置
 */
message.config({
    maxCount: 2
});

interface IIndexProps extends IGlobalInterface { }

interface IIndexState { }

class IndexComponent extends React.Component<IIndexProps, IIndexState> {
    constructor(props: IIndexProps, context?: any) {
        super(props, context);
    }

    /**
     * 获取全局需要的数据
     */
    private fetchGlobalInfo(): void {
        Request.get('/api/globalInfo')
            .then((result: any) => {
                this.props.dispatch({
                    type: 'GlobalInfoModels/changeGlobalInfo',
                    data: result
                });
            });
    }

    public componentDidMount(): void {
        !IndexConf.UnFetchGlobalInfo() && this.fetchGlobalInfo();
    }

    public render(): React.ReactNode {
        return (
            <div className={style.appContent}>
                {IndexConf.UnNeedHeader() ? '' : <Header />}
                <div className={style.content}>
                    {this.props.children}
                </div>
                {IndexConf.UnNeedFooter() ? '' : <Footer />}
            </div>
        );
    }
}

export default withRouter(connect()(IndexComponent));
