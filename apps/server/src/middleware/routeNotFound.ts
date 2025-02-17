import { Request, Response } from 'express';
import { AppError } from './errorHandler';

export const routeNotFound = (req: Request, res: Response): void => {
  throw new AppError(404, `Route ${req.originalUrl} not found`);
};
