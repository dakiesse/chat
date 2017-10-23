import chalk from 'chalk'
import * as Koa from 'koa'

import './providers/dotenv'
import './providers/database'
import './providers/passport'
import applyMiddlewares from './middlewares'
import applyRoutes from './routes'

const app: Koa = new Koa()
const port: number = Number(process.env.APP_PORT) || 3000

app.use(async (ctx, next): Promise<any> => {
  try {
    await next()
  } catch (err) {
    console.error(chalk.black.bgRed(`Big error: : ${err.message}`))
    console.info(chalk.black.bgBlue(err.stack))
  }
})

applyMiddlewares(app)
applyRoutes(app)

app
  .listen(port, (): void => {
    console.log(chalk.black.bgGreen(`Listening on port ${port}`))
  })
  .on('error', (err: Error): void => {
    console.error(chalk.black.bgRed(`Server error: ${err}`))
    console.info(chalk.black.bgBlue(err.stack))
  })

process.on('uncaughtException', (err: Error) => {
  console.error(chalk.black.bgRed(`Server uncaughtException: ${err.message}`))
  console.info(chalk.black.bgBlue(err.stack))
})
