// eslint-disable-next-line import/no-extraneous-dependencies
import { WithId } from 'mongodb';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as z from 'zod';

import { db } from '../../config/db';

export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
}); // Schema



export type Todo = z.infer<typeof Todo>; // Types
export type TodoWithId = WithId<Todo>;
export const Todos = db.collection<Todo>('todos');
