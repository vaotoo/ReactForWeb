import * as Request from '@utils/Request';

export const fetchUserList = (params: any = {}) => {
    return Request.get('/api/users', {
        page: params.page || 1,
        limit: 5
    });
};
