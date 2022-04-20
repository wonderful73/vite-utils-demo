function getCookie(key) {
  var arr = document.cookie.split("; ");
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("=");
    if (arr2[0] == key) {
      return arr2[1];
    }
  }
  return "";
}
function setCookie(params) {
  const {
    key,
    value,
    time = 365,
    options = { domain: window.location.hostname, path: "/" }
  } = params;
  let oDate = new Date();
  oDate.setDate(oDate.getDate() + time);
  document.cookie = key + "=" + value + ";domain=" + options.domain + ";path=" + options.path + ";expires=" + oDate;
}
function removeCookie(key) {
  setCookie({
    key,
    value: "",
    time: -1
  });
}
function getUrlParams(key, isDecode) {
  if (key == "" && typeof key !== "string") {
    return;
  }
  const result = (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ["", null])[1];
  if (isDecode && result !== null) {
    return decodeURIComponent(result);
  }
  return result;
}
function isAppWebView() {
  const platform = getUrlParams("platform") || getCookie("platform");
  return platform === "app_ios" || platform === "app_android";
}
function isAndroid() {
  return !!window.navigator.userAgent.match(/Android/i);
}
function isIos() {
  return !!window.navigator.userAgent.match(/iPhone|iPod|iPad/i);
}
function isWechatMiniApp() {
  return window.__wxjs_environment === "miniprogram";
}
const toString = (v) => Object.prototype.toString.call(v);
const isString = (val) => typeof val === "string";
const isObject = (val) => toString(val) === "[object Object]";
function createUUID() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 16), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}
function compareVersion(target, source) {
  source = source || getUrlParams("clientVersion") || getCookie("clientVersion");
  if (!source || !target) {
    return true;
  }
  if (source == target) {
    return true;
  }
  const targetArray = target.split(".");
  const sourceArray = source.split(".");
  for (var i = 0; i < targetArray.length; i++) {
    if (parseInt(sourceArray[i]) > parseInt(targetArray[i])) {
      return true;
    } else if (parseInt(sourceArray[i]) < parseInt(targetArray[i])) {
      return false;
    }
  }
  return false;
}
function getMonitorParams(options) {
  const { eventId, eventType, source, extra } = options;
  if (!eventId) {
    throw new Error("eventId\u4E0D\u5141\u8BB8\u4E3A\u7A7A");
  }
  let distinct_id;
  if (isAppWebView()) {
    distinct_id = getUrlParams("distinct_id") || getCookie("distinct_id") || "";
  } else {
    distinct_id = getCookie("distinct_id") || createUUID();
  }
  if (distinct_id) {
    setCookie({
      key: "distinct_id",
      value: distinct_id,
      time: 5
    });
  }
  return {
    model: "unknown",
    ds: window.screen.width * window.devicePixelRatio + "*" + window.screen.height * window.devicePixelRatio,
    loc: "",
    event_type: eventType || 1,
    etcos: isIos() ? 2 : 1,
    version: getUrlParams("clientVersion") || getCookie("clientVersion"),
    token: getUrlParams("token") || getCookie("token"),
    url: location.href,
    event_name: eventId,
    ua: navigator.userAgent,
    distinct_id,
    nfc_type: "",
    source: source ? source : isAppWebView() ? 3 : 4,
    extra: JSON.stringify(extra || "")
  };
}
function jsonToAppParams(json) {
  let result = "";
  for (let key in json) {
    if (json[key] !== null && json[key] !== "") {
      result += `||${key}==${json[key]}`;
    }
  }
  return result.substring(2) || "-1";
}
function goToApp(cmd, param) {
  let paramStr;
  if (isObject(param)) {
    paramStr = jsonToAppParams(param);
  } else if (isString(param)) {
    paramStr = param;
  } else {
    console.warn("\u53C2\u6570\u683C\u5F0F\u4E0D\u6B63\u786E");
    return;
  }
  if (!isAppWebView()) {
    console.warn("\u975EAPP\u73AF\u5883");
    return;
  }
  if (isAndroid()) {
    if (window.JavaScriptHelper) {
      console.log("\u6267\u884C\u5B89\u5353\u6307\u4EE4:" + cmd, paramStr);
      window.JavaScriptHelper.sendCommand(cmd, paramStr);
    } else {
      console.warn("\u975EAPP\u73AF\u5883\u6267\u884C\u5B89\u5353\u6307\u4EE4");
    }
  } else if (isIos()) {
    if (window.webkit) {
      console.log("\u6267\u884CIOS3.2\u6307\u4EE4:" + cmd, paramStr);
      window.webkit.messageHandlers.sendCommand.postMessage(`${cmd}:${paramStr}`);
    } else {
      console.log("\u6267\u884CIOS\u6307\u4EE4:" + cmd, paramStr);
      setTimeout(() => {
        window.location = cmd + ":" + paramStr;
      }, 500);
    }
  } else {
    console.warn("\u975EAPP\u73AF\u5883\u6267\u884C\u6307\u4EE4");
  }
}
export { compareVersion, createUUID, getCookie, getMonitorParams, getUrlParams, goToApp, isAndroid, isAppWebView, isIos, isObject, isString, isWechatMiniApp, jsonToAppParams, removeCookie, setCookie, toString };
