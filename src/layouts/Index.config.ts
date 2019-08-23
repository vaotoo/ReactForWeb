/**
 * 匹配操作
 * @param pathList
 */
const regExpFn = (pathList: string[]): boolean => {
    return new RegExp(pathList.join('|'), 'gi').test(location.pathname);
};

/**
 * 不需要公共头
 */
export const UnNeedHeader = (): boolean => regExpFn([
    'secondPageExample',
    'fullScreen',
    'login',
    'forbidden'
]);

/**
 * 不需要公共尾
 */
export const UnNeedFooter = (): boolean => regExpFn([
    'fullScreen',
    'login',
    'forbidden'
]);

/**
 * 不需要获取全局数据
 */
export const UnFetchGlobalInfo = (): boolean => regExpFn([
    'login',
    'forbidden'
]);
