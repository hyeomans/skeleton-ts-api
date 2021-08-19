const nodeEnv = process.env.NODE_ENV || 'development'

export interface IConfig {
  env: string
  salt: Buffer
}

const config: IConfig = {
  env: nodeEnv,
  salt: Buffer.from(process.env.SALT || 'somesaltingtodo'),
}

export default config
