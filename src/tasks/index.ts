import { Queue, Worker } from 'bullmq'
import { IConfig } from '../config'
import { Logger } from 'pino'

export interface EmailTaskInput {
  to: string
  from: string
}

export interface ITasks {
  emailsQueue: Queue<EmailTaskInput, any, string>
  emailsWorker: Worker<any, any, string>
}

const initTasks = (config: IConfig, logger: Logger): ITasks => {
  const emailsQueue = new Queue<EmailTaskInput>('emails', {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
    },
  })

  const emailsWorker = new Worker(
    'emails',
    async (job) => {
      logger.info(`Sending email with data`, job.data)
      await Promise.resolve() //TODO: change to actual work
    },
    {
      connection: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
      },
    },
  )

  return {
    emailsQueue,
    emailsWorker,
  }
}

export default initTasks
