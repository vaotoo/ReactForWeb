import React from 'react';
import { Bind } from 'lodash-decorators';
import AnchorMenu from './anchorMenu/AnchorMenu';
import AnchorContent from './anchorContent/AnchorContent';
import style from './Anchor.less';

interface IAnchorProps { }

interface IAnchorState {
    contentHeight: string;
}

class AnchorComponent extends React.Component<IAnchorProps, IAnchorState> {
    constructor(props: IAnchorProps, context?: any) {
        super(props, context);
        this.state = {
            contentHeight: '100%'
        };
    }

    @Bind()
    private resizeListener(): void {
        const elemt: HTMLElement = document.documentElement as HTMLElement;
        this.setState({
            contentHeight: `${elemt.clientHeight - 230}px`
        });
    }

    public componentDidMount() {
        this.resizeListener();
        (document.querySelector('body') as HTMLBodyElement).style.overflow = 'hidden';
        window.addEventListener('resize', this.resizeListener);
    }

    public componentWillUnmount() {
        (document.querySelector('body') as HTMLBodyElement).style.overflow = '';
        window.removeEventListener('resize', this.resizeListener);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.anchorContent} style={{ height: this.state.contentHeight }}>
                <AnchorMenu />
                <AnchorContent />
            </div>
        );
    }
}

export default AnchorComponent;
