import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureTeacher(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.user.is_teacher === false) {
    throw new AppError('No permission to access this resource', 401);
  }

  return next();
}
