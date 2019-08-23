import React from 'react';
import style from './AnchorContent.less';

interface IAnchorContentProps { }

interface IAnchorContentState { }

class AnchorContentComponent extends React.Component<IAnchorContentProps, IAnchorContentState> {
    constructor(props: IAnchorContentProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.anchorContent}>
                敬请期待
            </div>
        );
    }
}

export default AnchorContentComponent;
