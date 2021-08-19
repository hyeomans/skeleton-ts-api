import { Connection } from 'typeorm'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import createNewEmailAccount from './createNewEmailAccount'
import { Logger } from 'pino'
const ajv = new Ajv()
addFormats(ajv)

export interface IServices {
  createNewEmailAccount: (input: { email: string; password: string }) => Promise<{ accountId: number } | undefined>
}

const services = (dbConnection: Connection, logger: Logger): IServices => {
  return {
    createNewEmailAccount: createNewEmailAccount(dbConnection, ajv, logger),
  }
}

export default services
