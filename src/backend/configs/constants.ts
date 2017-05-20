import { resolve } from 'path'

export const NODE_ENV = process.env.NODE_ENV || 'development'
export const BASE_PATH: string = resolve('./')
export const APP_PATH: string = resolve(BASE_PATH, './src/backend')
export const PUBLIC_PATH: string = resolve(BASE_PATH, './public')

export const JWT_SECRET: string = process.env.JWT_SECRET || 'secret'
