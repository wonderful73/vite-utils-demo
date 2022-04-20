import { getCookie, setCookie } from '../cookie'
import { getUrlParams } from '../urlParams'
import { isAppWebView, isIos, isAndroid } from '../ua'

export const toString = (v: any) => Object.prototype.toString.call(v)
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isObject = (val: any): val is object => toString(val) === '[object Object]'
export function createUUID() {
  const s: Array<any> = [];
  const hexDigits = "0123456789abcdef";

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  
  s[14] = "4";  
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
}

/**
 *
 * @description 判断当前版本是否大于等于目标版本（version格式[1.0.0]）
 * @export {function}
 * @param {string} target 目标版本
 * @param {string} source 要对比的版本，默认为当前版本
 * @return {boolean}
 * 
 */
export function compareVersion(target: string, source: string): boolean {
  source = source || getUrlParams("clientVersion") || getCookie('clientVersion')

  if (!source || !target) {
    return true
  }

  if (source == target) {
    return true
  }

  const targetArray = target.split('.')
  const sourceArray = source.split('.')

  for (var i = 0; i < targetArray.length; i++) {

    if (parseInt(sourceArray[i]) > parseInt(targetArray[i])) {
      return true
    } else if (parseInt(sourceArray[i]) < parseInt(targetArray[i])) {
      return false
    }

  }

  return false
}

export interface ICountParams {
  eventId: string,
  eventType?: number,
  extra?: object,
  source?: number,
  loading?: boolean
}

/**
 * 获取事件监控参数
 * eventId 事件ID，必传，String
 * eventType 事件类型，选传，Number，默认1：页面访问，2：行为事件
 * extra 额外数据，选传，JsonObject
 * @return {object}
 */
export  function getMonitorParams (options: ICountParams) {

  const { eventId, eventType, source, extra } = options

  if(!eventId){
    throw new Error('eventId不允许为空')
  }

  let distinct_id: any
  if (isAppWebView()) {
    distinct_id = getUrlParams('distinct_id') || getCookie('distinct_id') || ''
  } else {
    distinct_id = getCookie('distinct_id') || createUUID()
  }
  if (distinct_id) {
    setCookie({
      key: 'distinct_id', 
      value: distinct_id, 
      time: 5
    })
  }

  return  {
    model: 'unknown',
    ds: (window.screen.width * window.devicePixelRatio) + '*' + (window.screen.height * window.devicePixelRatio),
    loc: '',
    event_type: eventType || 1,//事件类型：1：页面访问，2：行为事件
    etcos: isIos() ? 2 : 1,
    version: getUrlParams('clientVersion') || getCookie("clientVersion"),
    token: getUrlParams('token') || getCookie('token'),
    url: location.href,
    event_name: eventId,//统计事件
    ua: navigator.userAgent,
    distinct_id: distinct_id,
    nfc_type: '',
    source: source ? source : (isAppWebView() ? 3 : 4),//来源，3：app内H5，4：app外H5
    extra: JSON.stringify(extra || ''),
  }

}

interface IJson {
  [key: string] : string | number 
}

export function jsonToAppParams(json: IJson) {
  let result = "";

  for (let key in json) {
    if (json[key] !== null && json[key] !== '') {
      result += `||${key}==${json[key]}`;
    }
  }

  return result.substring(2) || "-1";
}

export function goToApp(cmd: string, param: string | IJson) {
  let paramStr: string

  if (isObject(param)) {
    paramStr = jsonToAppParams(param);
  } else if (isString(param)) {
    paramStr = param
  } else {
    console.warn('参数格式不正确');
    return
  }
  
  if (!isAppWebView()) {
    console.warn('非APP环境');
    return;
  }

  if (isAndroid()) {
    if (window.JavaScriptHelper) {
      console.log('执行安卓指令:' + cmd, paramStr);
      window.JavaScriptHelper.sendCommand(cmd, paramStr);
    } else {
      console.warn('非APP环境执行安卓指令');
    }
  } else if (isIos()) {
    if (window.webkit) {
      console.log('执行IOS3.2指令:' + cmd, paramStr);
      window.webkit.messageHandlers.sendCommand.postMessage(`${cmd}:${paramStr}`);
    } else {
      console.log('执行IOS指令:' + cmd, paramStr);
      setTimeout(() => {
        // @ts-ignore
        window.location = cmd + ":" + paramStr; 
      }, 500);
    }
  } else {
    console.warn('非APP环境执行指令')
  }
}