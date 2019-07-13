import React from 'react';
import style from './index.less';

interface ISecondPageIndexProps { }

interface ISecondPageIndexState { }

class SecondPageIndexComponent extends React.Component<ISecondPageIndexProps, ISecondPageIndexState> {
    constructor(props: ISecondPageIndexProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.indexContent}>
                欢迎来到二级页面
            </div>
        );
    }
}

export default SecondPageIndexComponent;
