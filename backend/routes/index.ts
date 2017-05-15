import * as Application from 'koa'
import authRouter from './auth'
import frontRouter from './front'

export default function applyRoutes (app: Application): void {
  app.use(authRouter.routes())
  app.use(frontRouter.routes())
}
