import * as Application from 'koa'
import * as Router from 'koa-router'

const router: Router = new Router()

router.get('/', (ctx: Application.Context): void => {
  ctx.render('index')
})

router.get('**', (ctx: Application.Context): void => {
  ctx.render('index')
})

export default router
