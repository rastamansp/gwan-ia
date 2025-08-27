export class AuthError extends Error {
  public readonly originalError?: Error;
  public readonly code?: string;

  constructor(message: string, originalError?: Error, code?: string) {
    super(message);
    this.name = 'AuthError';
    this.originalError = originalError;
    this.code = code;
  }
}

export class ValidationError extends Error {
  public readonly field?: string;
  public readonly value?: any;

  constructor(message: string, field?: string, value?: any) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

export class NetworkError extends Error {
  public readonly statusCode?: number;
  public readonly response?: any;

  constructor(message: string, statusCode?: number, response?: any) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
    this.response = response;
  }
}
