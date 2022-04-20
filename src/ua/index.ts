import { getCookie } from '../cookie'
import { getUrlParams } from '../urlParams'

export function isAppWebView() {
  const platform = getUrlParams('platform') || getCookie('platform')
  return (platform === 'app_ios' || platform === 'app_android')
}

export function isAndroid() {
  return !!window.navigator.userAgent.match(/Android/i)
}

export function isIos() {
  return !!window.navigator.userAgent.match(/iPhone|iPod|iPad/i);
}

export function isWechatMiniApp() {
  return window.__wxjs_environment === 'miniprogram'
}