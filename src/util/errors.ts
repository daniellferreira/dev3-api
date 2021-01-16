export enum UserStatusCodes {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}
export enum InternalStatusCodes {
  InternalServerError = 500,
}

export class InternalError extends Error {
  constructor(
    public message: string,
    protected code:
      | InternalStatusCodes
      | UserStatusCodes = InternalStatusCodes.InternalServerError,
    protected description?: string
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class UserError extends InternalError {
  constructor(
    public message: string,
    protected code: UserStatusCodes = UserStatusCodes.BadRequest,
    protected description?: string
  ) {
    super(message, code, description)
  }
}
