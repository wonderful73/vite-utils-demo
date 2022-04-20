# 前端工具函数库
A typescript utils library base on vite.

## Installation
```sh

$ yarn add cbutils -S

# or

$ npm i cbutils -S

```

## Examples

```javascript

import {  compareVersion, 
          createUUID, 
          getCookie, 
          getMonitorParams, 
          getUrlParams, 
          goToApp, 
          isAndroid, 
          isAppWebView, 
          isIos, 
          isWechatMiniApp, 
          jsonToAppParams, 
          removeCookie, 
          setCookie, 
        } from 'cbutils'

compareVersion("3.2.0") // => 当前版本是3.2.0以下为true
compareVersion("3.2.0", "1.0.0");// => false
compareVersion("3.2.0","4.0.0");// => true

createUUID();// => 4e0b9c2b-b570-4e08-8411-28962e57094f

getCookie("token");// => 1a2b3c1d2e3f1a2b3c1d2e3f

// 组合统计埋点的参数
getMonitorParams({
  eventId: 'abc',
  eventType: 2, // 非必须
  extra: {abc: 123} // 非必须
}) 

getUrlParams("version");// => 3.0.0
getUrlParams("backUrl");// => https%3A%2F%2Fwww.xxx.com
getUrlParams("backUrl",1);// => https://www.xxx.com

goToApp("login", "-1")
goToApp("changeTitle", `title==哈哈哈`)
goToApp("changeTitle", {title: "哈哈哈"})

isAndroid() // true||false 是否安卓系统
isIos() // true||false 是否ios系统

isAppWebView() // 是否 app webview 环境

isWechatMiniApp() // 是否微信小程序环境

jsonToAppParams({a: 1, b: 2}) // "a==1||b==2"

removeCookie("token") 

setCookie({
  key: 'token',
  value: "1232fsfasfgadv",
  options: { // 非必须
    domain: 'xxx.com',
    path: '/'
  }
})

```