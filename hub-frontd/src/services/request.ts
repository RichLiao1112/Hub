import Taro from "@tarojs/taro";
import { showToast } from "@tarojs/taro";

export interface IOption {
  toast: boolean;
  errorStatusCodeFilter: boolean;
}

export interface IResponseError { errMsg: string; path: string; timestamp: string; method: string };

export interface IResponse<T> {
  statusCode: number;
  data: T;
}

export const withRequest = async <T>(payload: Taro.request.Option, options: IOption = { toast: true, errorStatusCodeFilter: true}) => {
  return new Promise<IResponse<T>>(async (resolve, reject) => {
    const resp: IResponse<T & IResponseError> = await Taro.request({
      ...payload,
      url: payload.url,
      header: {
        'content-type': 'application/json'
      },
      enableHttp2: true,
    });
    console.log('[resp]', ` [${payload.url}] `, resp);
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      return resolve(resp);
    } else if (options.toast) {
      showToast({ title: resp.data.errMsg || '请求失败', icon: 'none' })
    }
    if (!options.errorStatusCodeFilter) {
      return resolve(resp);
    } else {
      return reject(resp)
    }
  })
}