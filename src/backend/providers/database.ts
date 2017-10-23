import * as mongoose from 'mongoose'
import { dsn } from 'configs/database'
import chalk from 'chalk'

(mongoose as any).Promise = global.Promise
mongoose.connect(dsn, { useMongoClient: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log(chalk.black.bgGreen('Connection with database succeeded.')))

export  { db }
