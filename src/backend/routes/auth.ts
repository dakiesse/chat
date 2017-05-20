import * as Application from 'koa'
import * as passport from 'koa-passport'
import * as Router from 'koa-router'
import { facebookScope, googleScope } from 'configs/passport'
import { JWT_SECRET } from 'configs/constants'
import { sign } from 'jsonwebtoken'

const router: Router = new Router()
const passportAuthMiddleware = passport.authenticate([ 'facebook', 'google' ], { failureRedirect: '/' })

router.get('/auth/facebook', passport.authenticate('facebook', { scope: facebookScope }))
router.get('/auth/google', passport.authenticate('google', { scope: googleScope }))

router.all('/auth/any/callback', passportAuthMiddleware, (ctx: Application.Context): void => {
  const token = sign({
    id: ctx.state.user.id,
    username: ctx.state.user.username,
  }, JWT_SECRET)

  ctx.render('index', { token })
})

export default router
