
import { Context } from './Context'


class ColombiaPublicError extends Error {

  isColombiaPublicError = true

  sdk = 'ColombiaPublic'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ColombiaPublicError
}

