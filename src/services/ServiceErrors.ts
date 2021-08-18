import { ErrorObject } from 'ajv'
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

export class ValidationError extends Error {
  constructor(validationErrors?: null | ErrorObject[]) {
    super()
    this.name = 'Validation Error:'
    this.message =
      (validationErrors &&
        validationErrors.map((e) => `property: ${e.schemaPath} - message: ${e.message}.`).join('|')) ||
      'No input from ajv for validation error.'
  }
}
