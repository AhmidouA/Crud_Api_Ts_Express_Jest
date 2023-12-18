import { Router, Request, Response } from 'express';
import * as TodoControllers from './todos.controllers';
import { validateRequest } from '../../middlewares'; 
import { ParamsWithId } from '../../interfaces/ParamsWithId'; 
import { Todo } from './todos.model';



const router = Router();




router.get('/', TodoControllers.findAll);

router.get('/:id', 
  validateRequest({
    params: ParamsWithId,
  }),
  TodoControllers.findOneById,
);

router.post('/', 
  validateRequest({
    body: Todo,
  }),  
  TodoControllers.createOne,
);

router.put('/', 
  validateRequest({
    params: ParamsWithId,
    body: Todo,
  }),  
  TodoControllers.updateById,
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TodoControllers.deleteById,
);

export default router;