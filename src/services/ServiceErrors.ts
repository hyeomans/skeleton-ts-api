export class NotFoundServiceError extends Error {
  constructor(message: string) {
    super()
    this.name = 'NotFound'
    this.message = message
  }
}

export class UnexpectedError extends Error {
  constructor(message: string) {
    super()
    this.name = 'UnexpectedError'
    this.message = message
  }
}

export class ServiceError extends Error {
  constructor(name: string, message: string) {
    super()
    this.name = name
    this.message = message
  }
}

// export class ValidationError extends Error {
//   constructor(validationErrors: Array<string>) {
//     super()
//     this.name = 'Validation Error:'
//     this.message = validationErrors.map((e) => `property: ${e.schemaPath} - message: ${e.message}.`).join('|')
//   }
// }
