export class AppError extends Error {
  public code: string;
  public status: number;

  constructor(message: string, code = "APP_ERROR", status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}
