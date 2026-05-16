
import { Context } from './Context'


class ZippopotamusZipCodeError extends Error {

  isZippopotamusZipCodeError = true

  sdk = 'ZippopotamusZipCode'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ZippopotamusZipCodeError
}

