import pino from 'pino'

let options = {}

if (process.env.NODE_ENV !== 'production') {
  options = Object.assign(options, { prettyPrint: { levelFirst: true } })
}

const logger = pino(options)

export default logger
