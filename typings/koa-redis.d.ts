declare type RedisStoreOptions = {
  client?: object,
  socket?: string,
  db?: string,
  duplicate?: boolean,
  pass?: string,
  [key: string]: any,
}

declare class RedisStore {
  constructor (options: RedisStoreOptions)
}

export = RedisStore
