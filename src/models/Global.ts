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
        saveGlobalInfo(state: IGlobalInfo, { data }) {
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        // 更改
        * changeGlobalInfo({ data }, { put }) {
            yield put({
                type: 'saveGlobalInfo',
                data: data
            });
        }
    }
};
