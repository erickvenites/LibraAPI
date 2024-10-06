class HttpError extends Error {
  status: any;

  constructor(status: string, message: string) {
    super(message);
    this.status = status;
  }
}

export default HttpError;
