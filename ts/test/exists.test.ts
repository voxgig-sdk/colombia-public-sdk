
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ColombiaPublicSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ColombiaPublicSDK.test()
    equal(testsdk instanceof ColombiaPublicSDK, true,
      'ColombiaPublicSDK.test() must return a client synchronously')
  })

})
