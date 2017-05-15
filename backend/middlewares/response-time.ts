import * as Application from 'koa'

export default async (ctx: Application.Context, next: () => void): Promise<void> => {
  const start: number = Date.now()

  await next()

  const delta: number = Math.ceil(Date.now() - start)
  ctx.set('X-Response-Time', `${delta}ms`)
}
