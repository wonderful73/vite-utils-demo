import type { Test } from '../types'

export function cookies() {
  const t : Test = '456'
  console.log(t)

  function get() {}
  function set() {}
  function del() {}

  return {
    get,
    set,
    del
  }
}
