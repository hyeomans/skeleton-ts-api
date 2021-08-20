import { IConfig } from 'config'
import Redis from 'ioredis'

const initRedis = (config: IConfig) => {
  const redis = new Redis({
    port: config.redis.port,
    host: config.redis.host,
    password: config.redis.password,
  })
  return redis
}

export default initRedis
