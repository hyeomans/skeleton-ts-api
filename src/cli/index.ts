import 'reflect-metadata'
import inquirer from 'inquirer'
import ormConfig from '../db/ormconfig'
import { createConnection } from 'typeorm'
import initServices, { IServices } from '../services'
import logger from '../logger'
import config from '../config'

const isDev = process.env.NODE_ENV !== 'production'

if (!isDev) {
  console.error('only ran cli on dev mode')
  process.exit(1)
}

const initChoices = (services: IServices) => {
  return {
    'Create a new unconfirmed account': async () => {
      const { email, password } = await inquirer.prompt([
        {
          type: 'input',
          name: 'email',
          message: 'Type the desired email:',
        },
        {
          type: 'password',
          name: 'password',
          message: 'Type the desired password:',
        },
      ])
      const result = await services.createNewEmailAccount({ email, password })
      return result
    },
  }
}

async function main() {
  const connection = await createConnection(ormConfig)
  const services = await initServices(connection, logger, config)
  const choices: Record<string, any> = initChoices(services)

  const answers = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What do you want to do?',
    choices: Object.keys(choices),
  })

  const result = await choices[answers.choice]()
  return result
}

main()
  .then((result) => {
    console.log('done', result)
    process.exit(0)
  })
  .catch((e) => {
    console.log('error', e)
    process.exit(1)
  })
