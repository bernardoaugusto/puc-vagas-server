import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureUser(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.user.isAdmin) {
    throw new AppError('No permission to access this resource', 401);
  }

  return next();
}
