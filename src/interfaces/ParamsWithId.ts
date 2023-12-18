// eslint-disable-next-line import/no-extraneous-dependencies
import * as z from 'zod';

export const ParamsWithId = z.object({
  id: z.string().min(1).refine((val) => {
    try {
      return new Object(val);
    } catch (error) {
      return false;
    }
  }, {
    message: 'invalid ObjectId',
  }), 
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;