
export function getCookie(key: string) {
  var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0] == key) {
            return arr2[1];
        }
    }
    return "";
}

export interface ICookieParams {
  key: string,
  value: string,
  time?: number,
  options?: {
    domain?: string,
    path?: string
  }
}

export function setCookie(
  params: ICookieParams = {
    key: '',
    value: '',
    time: 365,
    options: {
      domain: window.location.hostname,
      path: '/'
    }
  }
) {
  const {
    key,
    value,
    time,
    options
  } = params

  let oDate = new Date()
  oDate.setDate(oDate.getDate() + time!)

  document.cookie = key + "=" + value + ";domain=" + options!.domain + ";path=" + options!.path + ";expires=" + oDate;
}

export function removeCookie(key: string) {
  setCookie({
    key,
    value: '',
    time: -1
  });
}