
export function getUrlParams (key: string, isDecode?: boolean) {

  if (key == '' && typeof key !== 'string') {
    return
  }

  const resut = (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1]

  if (isDecode && resut !== null) {
    return decodeURIComponent(resut)
  }
  
  return resut
}