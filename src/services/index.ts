import { Connection } from 'typeorm'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import createNewEmailAccount from './createNewEmailAccount'
const ajv = new Ajv()
addFormats(ajv)

export interface IServices {
  createNewEmailAccount: (input: { email: string; password: string }) => Promise<{ accountId: number } | undefined>
}

const services = (connection: Connection): IServices => {
  return {
    createNewEmailAccount: createNewEmailAccount(connection, ajv),
  }
}

export default services
