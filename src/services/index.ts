import { Account } from '../db/entity/Account'
import { AccountEmail } from '../db/entity/AccountEmail'
import { Connection } from 'typeorm'
import { ServiceError, UnexpectedError } from './ServiceErrors'

const createNewEmailAccount = (connection: Connection) => {
  return async (email: string, password: string) => {
    //TODO: Validation
    const result = await connection.transaction(async (transactionalEntityManager) => {
      try {
        const account = new Account()
        account.email = email

        await transactionalEntityManager.save(account)

        const accountEmail = new AccountEmail()
        accountEmail.account = account
        accountEmail.email = email
        accountEmail.password = password

        await transactionalEntityManager.save(accountEmail)
        const accountId: number = transactionalEntityManager.getId(account)
        return { accountId }
      } catch (e) {
        if (e.name === 'QueryFailedError') {
          throw new ServiceError('DuplicatedEmail', `${e.detail} on table: ${e.table}`)
        }
        throw new UnexpectedError('unexpected error on create new email account transaction')
      }
    })
    return result
  }
}

export interface IServices {
  createNewEmailAccount: (email: string, password: string) => Promise<{ accountId: number } | undefined>
}

const services = (connection: Connection): IServices => {
  return {
    createNewEmailAccount: createNewEmailAccount(connection),
  }
}

export default services
