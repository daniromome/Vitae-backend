import { ValidationError } from 'class-validator'

export const handleValidationErrors = (errors: ValidationError[]) => {
  const error = errors.toString()
  console.error(error)
  return { success: false, error, code: 400 }
}

export const handleServerError = (error: any) => {
  console.log(error)
  const message = error instanceof Error ? error.message : 'Unexpected Server Error'
  return { success: false, message, code: 500 }
}
