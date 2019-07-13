import React from 'react';
import style from './pageC.less';

interface IPageCProps { }

interface IPageCState { }

class PageCComponent extends React.Component<IPageCProps, IPageCState> {
    constructor(props: IPageCProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.pageB}>
                pageC
            </div>
        );
    }
}

export default PageCComponent;
