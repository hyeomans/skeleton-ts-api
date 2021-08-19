import argon from 'argon2'
import { Account } from '../db/entity/Account'
import { AccountEmail } from '../db/entity/AccountEmail'
import { Connection } from 'typeorm'
import { ServiceError, UnexpectedError, ValidationError } from './ServiceErrors'
import Ajv from 'ajv'
import { Logger } from 'pino'
import { IConfig } from 'config'

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 7 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

const createNewEmailAccount = (dbConnection: Connection, ajv: Ajv, logger: Logger, config: IConfig) => {
  const validate = ajv.compile(schema)
  return async (input: { email: string; password: string }) => {
    try {
      const isValid = validate(input)
      if (!isValid) {
        throw new ValidationError(validate.errors)
      }
      const passwordHash = await argon.hash(input.password, { salt: config.salt })

      const result = await dbConnection.transaction(async (transactionalEntityManager) => {
        const account = new Account()
        account.email = input.email

        await transactionalEntityManager.save(account)

        const accountEmail = new AccountEmail()
        accountEmail.account = account
        accountEmail.email = input.email
        accountEmail.password = passwordHash

        await transactionalEntityManager.save(accountEmail)
        const accountId: number = transactionalEntityManager.getId(account)
        return { accountId }
      })

      //TODO: Send email
      return result
    } catch (e) {
      if (e instanceof ValidationError) {
        throw e
      }

      if (e.name === 'QueryFailedError') {
        throw new ServiceError('DuplicatedEmail', `${e.detail} on table: ${e.table}`)
      }

      logger.error(e, `Email: ${input.email}`)
      throw new UnexpectedError(`unexpected error on create new email account transaction. Email ${input.email}`)
    }
  }
}

export default createNewEmailAccount
