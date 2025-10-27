export class ApiError extends Error {
  status: number;
  constructor(message: string = "Something went wrong", status: number) {
    super(message);
    this.status = status;
  }
}
