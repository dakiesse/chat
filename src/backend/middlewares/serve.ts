import * as Application from 'koa'
import * as serve from 'koa-static'
import { PUBLIC_PATH } from 'configs/constants'

export default function (): Application.Middleware {
  return serve(PUBLIC_PATH)
}
