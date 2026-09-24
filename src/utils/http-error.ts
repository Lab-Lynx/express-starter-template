// Throw this anywhere in a controller or service to send an error response.
// Example: throw new HttpError(404, 'Note not found');
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
