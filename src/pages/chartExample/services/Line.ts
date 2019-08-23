import Request from '@utils/Request';

/**
 * 获取数据
 * @param params
 */
export const fetchLineList = async (params: {}): Promise<[]> => {
    return Request.get('/api/map/line', { params });
};
