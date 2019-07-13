import * as usersService from '../services/users';

interface IUserInfo {
    list: any[];
    total: number;
}

const defaultState: IUserInfo = {
    list: [],
    total: 0
};

export default {
    namespace: 'listExample_models_users',
    state: { ...defaultState },
    reducers: {
        saveUserData(state: IUserInfo, config: any) {
            return {
                ...state,
                ...config.data
            };
        }
    },
    effects: {
        * fetchUserList(config: any, args: any) {
            const data = yield args.call(usersService.fetchUserList, config.data);
            yield args.put({
                type: 'saveUserData',
                data: {
                    list: data,
                    total: 125
                }
            });
        }
    },
    subscriptions: {
        setup(args: any) {
            return args.history.listen((params: any) => {
                params.pathname === '/listExample' && args.dispatch({
                    type: 'fetchUserList',
                    data: params.query
                });
            });
        }
    }
};
