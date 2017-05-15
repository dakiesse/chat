import * as Application from 'koa'
import * as logger from 'koa-logger'
import * as passport from 'koa-passport'
import bodyParser from './body-parser'
import responseTime from './response-time'
import serve from './serve'
import session from './session'
import view from './view'

export default function applyMiddlewares (app: Application): void {
  app.use(responseTime)
  app.use(logger())
  app.use(serve())
  app.use(session())
  app.use(bodyParser())
  app.use(passport.initialize())
  app.use(passport.session())
  view.use(app)
}
