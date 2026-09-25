
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ZippopotamusZipCodeSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ZippopotamusZipCodeSDK.test()
    equal(testsdk instanceof ZippopotamusZipCodeSDK, true,
      'ZippopotamusZipCodeSDK.test() must return a client synchronously')
  })

})
