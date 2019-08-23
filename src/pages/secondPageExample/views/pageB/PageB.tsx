import React from 'react';
import style from './PageB.less';

interface IPageBProps { }

interface IPageBState { }

class PageBComponent extends React.Component<IPageBProps, IPageBState> {
    constructor(props: IPageBProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.pageB}>
                pageB
            </div>
        );
    }
}

export default PageBComponent;
