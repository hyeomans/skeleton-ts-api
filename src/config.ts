const nodeEnv = process.env.NODE_ENV || 'development'

export interface IConfig {
  env: string
  salt: Buffer
  redis: {
    host: string
    port: number
    password?: string | undefined
  }
}

const config: IConfig = {
  env: nodeEnv,
  salt: Buffer.from(process.env.SALT || 'somesaltingtodo'),
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6380', 10),
    password: process.env.REDIS_PASSWORD,
  },
}

export default config
