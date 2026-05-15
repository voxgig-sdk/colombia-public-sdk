
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ColombiaPublicSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ColombiaPublicSDK.test()
    equal(null !== testsdk, true)
  })

})
