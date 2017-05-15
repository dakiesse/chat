import * as Pug from 'koa-pug'
import { resolve } from 'path'
import { APP_PATH } from '../configs/constants'

export default new Pug({
  compileDebug: false,
  debug: false,
  noCache: true,
  pretty: false,
  locals: { user: null },
  viewPath: resolve(APP_PATH, './views'),
})
