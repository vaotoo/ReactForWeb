import React from 'react';
import { connect } from 'dva';
import { Bind } from 'lodash-decorators';
import { Table, message } from 'antd';
import { UserColumns } from './columns';
import style from './list.less';

interface IUsersProps {
    list: any;
    total: any;
}

interface IUsersState { }

class UsersComponent extends React.Component<IUsersProps, IUsersState> {
    constructor(props: IUsersProps, context?: any) {
        super(props, context);
    }

    @Bind()
    private deleteHandler(record: any) {
        message.error(`您没有权限执行此操作 ID:${record.id}`);
    }

    public render(): React.ReactNode {
        return (
            <div className={style.usersPanel}>
                <div>
                    <Table
                        rowKey="id"
                        dataSource={this.props.list}
                        columns={UserColumns(this.deleteHandler)}
                        pagination={{
                            total: this.props.total
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => state.listExample_models_users
)(UsersComponent);
