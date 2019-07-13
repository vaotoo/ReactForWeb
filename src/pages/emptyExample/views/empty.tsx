import React from 'react';
import style from './empty.less';

interface IEmptyProps { }

interface IEmptyState { }

class EmptyComponent extends React.Component<IEmptyProps, IEmptyState> {
    constructor(props: IEmptyProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.emptyContent}>
                请开始你的表演
            </div>
        );
    }
}

export default EmptyComponent;
