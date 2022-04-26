export declare const toString: (v: any) => string;
export declare const isString: (val: unknown) => val is string;
export declare const isObject: (val: any) => val is object;
export declare function createUUID(): string;
export declare function getPostFix(): string;
/**
 *
 * @description 判断当前版本是否大于等于目标版本（version格式[1.0.0]）
 * @export {function}
 * @param {string} target 目标版本
 * @param {string} source 要对比的版本，默认为当前版本
 * @return {boolean}
 *
 */
export declare function compareVersion(target: string, source: string): boolean;
export interface ICountParams {
    eventId: string;
    eventType?: number;
    extra?: object;
    source?: number;
    loading?: boolean;
}
/**
 * 获取事件监控参数
 * eventId 事件ID，必传，String
 * eventType 事件类型，选传，Number，默认1：页面访问，2：行为事件
 * extra 额外数据，选传，JsonObject
 * @return {object}
 */
export declare function getMonitorParams(options: ICountParams): {
    model: string;
    ds: string;
    loc: string;
    event_type: number;
    etcos: number;
    version: string;
    token: string;
    url: string;
    event_name: string;
    ua: string;
    distinct_id: any;
    nfc_type: string;
    source: number;
    extra: string;
};
interface IJson {
    [key: string]: string | number;
}
export declare function jsonToAppParams(json: IJson): string;
export declare function goToApp(cmd: string, param: string | IJson): void;
export {};
