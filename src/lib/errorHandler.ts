import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import {
  UserStatusCodes,
  InternalStatusCodes,
  ErrorCause,
  InternalError,
} from '@src/util/errors'

const detailMessageByKind = new Map<string, string>(
  Object.entries({
    '': 'Invalid kind of error',
    required: 'Required field',
  })
)

export const ErrorHandler = (
  err: InternalError,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  let details: any = err.details
  let cause: ErrorCause | any = err.cause
  let message: string = err.message || 'Internal Error. Something went wrong!'
  let statusCode: UserStatusCodes | InternalStatusCodes =
    err.statusCode || InternalStatusCodes.InternalServerError

  if (err instanceof mongoose.Error.ValidationError) {
    if (err.errors) {
      details = {}
      Object.keys(err.errors).forEach((fieldName) => {
        const errorKind: string = err.errors[fieldName]?.kind || ''
        details[fieldName] = detailMessageByKind.get(errorKind)
      })
    }
    cause = 'VALIDATION_ERROR'
    statusCode = UserStatusCodes.Semantic
    message = 'There are validation errors'
  }

  res.status(statusCode).json({ message, cause, details })
}
