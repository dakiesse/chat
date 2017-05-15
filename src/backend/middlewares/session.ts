import * as Application from 'koa'
// import * as RedisStore from 'koa-redis'
import * as session from 'koa-session-minimal'

export default function (): Application.Middleware {
  return session({
    // store: RedisStore(),
  })
}
