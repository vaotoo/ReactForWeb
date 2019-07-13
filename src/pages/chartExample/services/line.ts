import * as Request from '@utils/Request';

/**
 * 获取数据
 * @param params
 */
export const fetchLineList = async (params: any = {}): Promise<[]> => {
    return Request.get('/api/map/line', params)
        .then((result: any) => result)
        .catch(() => []);
};
