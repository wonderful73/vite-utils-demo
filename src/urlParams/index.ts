
export function getUrlParams (key: string, isDecode?: boolean) {

  if (key == '' && typeof key !== 'string') {
    return
  }

  const result = (document.location.search.match(new RegExp("(?:^\\?|&)" + key + "=(.*?)(?=&|$)")) || ['', null])[1]

  if (isDecode && result !== null) {
    return decodeURIComponent(result)
  }
  
  return result
}