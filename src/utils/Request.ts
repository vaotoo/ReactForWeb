import { stringify as queryStringify } from 'query-string';
import fetch from 'dva/fetch';

interface IResponseBodyKey {
    readonly dataKey: string;
    readonly errorMsgKey: string;
    readonly errorCodeKey: string;
}

interface IResponseJsonObject<T> {
    [key: string]: T | string | number;
}

interface IRequestParams {
    readonly [key: string]: any;
}

interface IReponseError {
    readonly errmsg: string;
    readonly errno: number;
    readonly data?: string;
}

const SUCCESS_CODE: number = 0;

const responseBodyKey: IResponseBodyKey = {
    dataKey: 'data',
    errorCodeKey: 'errno',
    errorMsgKey: 'errmsg'
};

const isObject = (args: any): boolean => Object.prototype.toString.call(args) === '[object Object]';

type IRequestMethod = <T>(url: string, params: IRequestParams | FormData, headers?: HeadersInit) => Promise<T>;

/**
 * 通过JSON Url，直接获取JSON数据
 * @param   {string}      url
 * @param   {RequestInit} options
 * @returns {Promise<T>}
 */
export function getJson<T>(url: string, options: RequestInit = {}): Promise<T> {
    return new Promise<T>((
        resolve: (value?: T | PromiseLike<T>) => void,
        reject: (error: IReponseError) => void): void => {
        fetch(url, {
            credentials: 'include', ...options
        })
            .then((res: Response): void => {
                if (res.ok) {
                    res.json().then((value: T): void => {
                        resolve(value);
                    }, (reason?: any): void => {
                        console && console.warn(String(reason), Object.prototype.toString.call(reason));
                        reject({
                            errmsg: isObject(reason) ? JSON.stringify(reason) : String(reason),
                            errno: 200
                        });
                    });
                } else {
                    reject({
                        errmsg: res.statusText,
                        errno: res.status
                    });
                }
            }, (reason?: any): void => {
                reject({
                    errmsg: isObject(reason) ? JSON.stringify(reason) : String(reason),
                    errno: 400
                });
            });
    }
    );
}

/**
 * 请求数据方法
 * @param   {string}      url
 * @param   {RequestInit} options
 * @returns {Promise<T>}
 */
export default function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    return new Promise<T>((
        resolve: (value?: T | PromiseLike<T>) => void,
        reject: (reason: IReponseError) => void): void => {
        getJson<IResponseJsonObject<T>>(url, options)
            .then((res: IResponseJsonObject<T>): void => {
                if (Number(res[responseBodyKey.errorCodeKey]) === SUCCESS_CODE) {
                    resolve(res[responseBodyKey.dataKey] as T);
                } else {
                    reject({
                        errmsg: res[responseBodyKey.errorMsgKey] as string,
                        errno: Number(res[responseBodyKey.errorCodeKey]),
                        data: res[responseBodyKey.dataKey] as string
                    });
                }
            }, reject);
    }
    );
}

/**
 * 请求时，将参数放在search中，不放在request body里
 * @param   {string}                    url
 * @param   {IRequestParams | FormData} params
 * @param   {RequestInit}               options
 * @returns {Promise<T>}
 */
function requestWidthQuery<T>(
    url: string,
    params: IRequestParams | FormData = {},
    options: RequestInit = {}
): Promise<T> {
    let searchString: string = queryStringify(params);
    if (params instanceof FormData) {
        const formData: FormData = params;
        params = {};
        for (const entry of formData) {
            const item: string[] = entry.valueOf() as string[];
            params = {
                ...params,
                [item[0]]: item[1]
            };
        }
    }
    if (params && Object.keys(params).length) {
        searchString = `?${queryStringify(params)}`;
    }

    return request<T>(`${url}${searchString}`, options);
}

/**
 * 请求时，将参数放置在request body中
 * @param   {string}                    url
 * @param   {IRequestParams | FormData} params
 * @param   {RequestInit}               options
 * @returns {Promise<T>}
 */
function requestWidthBody<T>(
    url: string,
    params: IRequestParams | FormData = {},
    options: RequestInit = {}
): Promise<T> {
    const headers: HeadersInit = {};
    let body: any = params;
    if (params instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
    } else {
        headers['Content-Type'] = 'application/json;';
        body = JSON.stringify(params);
    }
    return request<T>(url, {
        body: body,
        headers: {
            ...options.headers,
            ...headers
        },
        ...options
    });
}

/**
 * 显示错误信息
 * @param {Promise<T>} requestMethod
 * @returns {Promise<T>}
 */
function appearErrorMessage<T>(requestMethod: Promise<T>): Promise<T> {
    requestMethod.catch((error: IReponseError): void => {
        switch (true) {
            // 没权限
            case error && error.errno && +error.errno === 401:
                // Permissions Code
                break;
            // 未登录
            case error && error.errno && +error.errno === 403:
                // SSOLogin Code
                break;
            default:
                console && console.warn(error);
                break;
        }
    });
    return requestMethod;
}

/**
 * Get 请求
 * @param   {string}         url
 * @param   {IRequestParams} params
 * @param   {HeadersInit}    headers
 * @returns {Promise<T>}
 */
export const get: IRequestMethod =
    <T>(url: string, params: IRequestParams = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(
            requestWidthQuery<T>(url, params, { method: 'GET', headers: headers })
        );
    };

/**
 * POST 请求
 * @param   {string}                    url
 * @param   {IRequestParams | FormData} params
 * @param   {HeadersInit}               headers
 * @returns {Promise<T>}
 */
export const post: IRequestMethod =
    <T>(url: string, params: IRequestParams | FormData = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(
            requestWidthBody<T>(url, params, { method: 'POST', headers: headers })
        );
    };

/**
 * PUT 请求
 * @param   {string}                    url
 * @param   {IRequestParams | FormData} params
 * @param   {HeadersInit}               headers
 * @returns {Promise<T>}
 */
export const put: IRequestMethod =
    <T>(url: string, params: IRequestParams | FormData = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(
            requestWidthBody<T>(url, params, { method: 'PUT', headers: headers })
        );
    };

/**
 * DELETE 请求[小写的delete为关键字，故使用大写]
 * @param   {string}                    url
 * @param   {IRequestParams | FormData} params
 * @param   {HeadersInit}               headers
 * @returns {Promise<T>}
 */
export const DELETE: IRequestMethod =
    <T>(url: string, params: IRequestParams = {}, headers: HeadersInit = {}): Promise<T> => {
        return appearErrorMessage(
            requestWidthQuery<T>(url, params, { method: 'DELETE', headers: headers })
        );
    };
