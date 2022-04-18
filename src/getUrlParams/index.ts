import type { Test } from '../types'

export type UrlParams<T> = T

export function getUrlParams (): UrlParams<String> {
  const t: Test = '123'
  console.log(t)
  console.log('getUrlParams')
  return 'getUrlParams'
}