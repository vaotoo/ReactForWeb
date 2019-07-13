export interface IGlobalInfo {
    userName: string;
}

const defaultState: IGlobalInfo = {
    userName: 'noName'
};

export default {
    namespace: 'GlobalInfoModels',
    state: { ...defaultState },
    reducers: {
        // 保存
        saveGlobalInfo(state: IGlobalInfo, config: any) {
            return {
                ...state,
                ...config.data
            };
        }
    },
    effects: {
        // 更改
        * changeGlobalInfo(config: any, args: any) {
            yield args.put({
                type: 'saveGlobalInfo',
                data: config.data
            });
        }
    }
};
