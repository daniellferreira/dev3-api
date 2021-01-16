export type UserStatusCodes = 400 | 401 | 404
export type InternalStatusCodes = 500

export class InternalError extends Error {
  constructor(
    public message: string,
    protected code: InternalStatusCodes | UserStatusCodes = 500,
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
    protected code: UserStatusCodes = 400,
    protected description?: string
  ) {
    super(message, code, description)
  }
}
