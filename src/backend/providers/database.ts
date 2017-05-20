import * as mongoose from 'mongoose'
import { dsn } from 'configs/database'
import * as chalk from 'chalk'

(mongoose as any).Promise = global.Promise
mongoose.connect(dsn)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log(chalk.black.bgGreen('Connection with database succeeded.')))

export  { db }
