import { ZodError } from 'zod';
import { ErrorRequestHandler } from 'express';
import { ErrorTypes, errorCatalog } from '../errors/catalog';

const ErrorHandler: ErrorRequestHandler = (
  err: Error | ZodError,
  _req,
  res,
  _next,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues });
  }
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }
  return res.status(500).json({ message: err.message });
};

export default ErrorHandler;