import { Connection } from 'typeorm'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import createNewEmailAccount from './createNewEmailAccount'
import { Logger } from 'pino'
import { IConfig } from 'config'
import { ITasks } from '../tasks'
const ajv = new Ajv()
addFormats(ajv)

export interface IServices {
  createNewEmailAccount: (input: { email: string; password: string }) => Promise<{ accountId: number } | undefined>
}

const services = (dbConnection: Connection, logger: Logger, config: IConfig, tasks: ITasks): IServices => {
  return {
    createNewEmailAccount: createNewEmailAccount(dbConnection, ajv, logger, config, tasks),
  }
}

export default services
