export class AppError extends Error {
  public isOperational: boolean;
  public status: string;
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
