import * as Application from 'koa'
import * as bodyParser from 'koa-bodyparser'

export default function (): Application.Middleware {
  return bodyParser({
    enableTypes: [ 'json' ],
  })
}
