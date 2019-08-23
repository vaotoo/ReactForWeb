import React from 'react';
import style from './Index.less';

interface IMenuPageIndexProps { }

interface IMenuPageIndexState { }

class MenuPageIndexComponent extends React.Component<IMenuPageIndexProps, IMenuPageIndexState> {
    constructor(props: IMenuPageIndexProps, context?: any) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.indexContent}>
                欢迎来到菜单页面
            </div>
        );
    }
}

export default MenuPageIndexComponent;
