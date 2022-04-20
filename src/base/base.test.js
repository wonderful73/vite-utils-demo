import { expect, it } from 'vitest'

import { compareVersion } from './index'

it('compareVersion', () => {
  expect(compareVersion('1.2.3', '1.2.4')).toEqual(true)
  expect(compareVersion('1.2.3', '1.2.3')).toEqual(true)
  expect(compareVersion('1.2.3', '1.2.2')).toEqual(false)
})
