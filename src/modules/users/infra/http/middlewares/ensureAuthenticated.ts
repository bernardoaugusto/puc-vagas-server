import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  is_contractor: boolean;
  is_teacher: boolean;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing!😖', 401);
  }

  const [format, token] = authHeader.split(' ');

  try {
    if (format !== 'Bearer') {
      throw new AppError('Invalid JWT token 😭😭', 401);
    }

    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub, is_contractor, is_teacher } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
      is_contractor,
      is_teacher,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token 😭😭', 401);
  }
}
