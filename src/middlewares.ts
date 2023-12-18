import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RequestValidators } from './interfaces/RequestValidators';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ZodError } from 'zod';

import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' });

import ErrorResponse from './interfaces/ErrorResponse';

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }   
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }    

      next();
    } catch (err) {
      console.log('error', err);
      if (err instanceof ZodError) {
        res.status(422);
      }
      next();     
    }
  };
}


export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
