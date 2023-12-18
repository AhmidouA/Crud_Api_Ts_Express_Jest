// eslint-disable-next-line import/no-extraneous-dependencies
import { AnyZodObject } from 'zod';

export interface RequestValidators {
  params?: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject,
  
}