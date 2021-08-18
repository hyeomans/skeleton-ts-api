import dotenv from 'dotenv'
import { ConnectionOptions } from 'typeorm'
dotenv.config()

const port = process.env.POSTGRES_PORT || ''

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(port, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migrations',
  },
}

export default config
