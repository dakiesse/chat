import * as Application from 'koa'
import * as passport from 'koa-passport'
import * as Router from 'koa-router'
import { facebookScope, googleScope } from 'configs/passport'

const router: Router = new Router()
const passportAuthMiddleware = passport.authenticate([ 'facebook', 'google' ], { failureRedirect: '/' })

router.get('/auth/facebook', passport.authenticate('facebook', { scope: facebookScope }))
router.get('/auth/google', passport.authenticate('google', { scope: googleScope }))

router.all('/auth/any/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (ctx: Application.Context): void => {
  ctx.redirect('/')
})

export default router
