import argon from 'argon2'
import { Account } from '../db/entity/Account'
import { AccountEmail } from '../db/entity/AccountEmail'
import { Connection } from 'typeorm'
import { ServiceError, UnexpectedError, ValidationError } from './ServiceErrors'
import Ajv from 'ajv'

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 7 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

const createNewEmailAccount = (connection: Connection, ajv: Ajv) => {
  const validate = ajv.compile(schema)
  return async (input: { email: string; password: string }) => {
    try {
      const isValid = validate(input)
      if (!isValid) {
        throw new ValidationError(validate.errors)
      }
      const passwordHash = await argon.hash(input.password)

      const result = await connection.transaction(async (transactionalEntityManager) => {
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
      return result
    } catch (e) {
      if (e instanceof ValidationError) {
        throw e
      }

      if (e.name === 'QueryFailedError') {
        throw new ServiceError('DuplicatedEmail', `${e.detail} on table: ${e.table}`)
      }
      throw new UnexpectedError(`unexpected error on create new email account transaction. Email ${input.email}`)
    }
  }
}

export default createNewEmailAccount
