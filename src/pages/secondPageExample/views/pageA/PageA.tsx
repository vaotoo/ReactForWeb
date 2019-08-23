import React from 'react';
import style from './PageA.less';

interface IPageAProps { }

interface IPageAState { }

class PageAComponent extends React.Component<IPageAProps, IPageAState> {
    constructor(props: IPageAProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.pageAContent}>
                pageA
            </div>
        );
    }
}

export default PageAComponent;
