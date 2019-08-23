export interface IModelsLeftMenu {
    collapsed: boolean;
}

/**
 * 左侧菜单收起按钮
 */
export default {
    namespace: 'menuExample_models_menu_leftMenu',
    state: {
        collapsed: false
    },
    reducers: {
        // 保存左侧菜单收起按钮状态
        saveChangeCollapsed(state: IModelsLeftMenu, { collapsed }) {
            return {
                ...state,
                collapsed
            };
        }
    },
    effects: {
        // 左侧菜单收起按钮发生更改
        * changeCollapsed(config: any, args: any) {
            yield args.put({
                type: 'saveChangeCollapsed',
                collapsed: config.collapsed
            });
        }
    }
};
