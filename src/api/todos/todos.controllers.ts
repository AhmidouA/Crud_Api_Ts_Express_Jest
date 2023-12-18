import { Request, Response, NextFunction } from 'express';
import { TodoWithId, Todos, Todo } from './todos.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ObjectId } from 'mongodb';



export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();
    res.json(todos);
  } catch (err) {
    console.log('error', err);
    next(err);
  }
}

export async function createOne(req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) {
  try {
    const insertResult = await Todos.insertOne(req.body);
    if (!insertResult.acknowledged) throw new Error('Error insterting todo');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (err) {
    console.log('error', err);
    next(err);    
  }   
}

export async function findOneById(req: Request <ParamsWithId, TodoWithId, {}>, res: Response <TodoWithId>, next: NextFunction) {
  try {
    const result = await Todos.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Todo with Id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (err) {
    console.log('error', err);
    next(err);    
  }
}

export async function updateById(req: Request <ParamsWithId, TodoWithId, Todo>, res: Response <TodoWithId>, next: NextFunction) {
  try {
    const result = await Todos.findOneAndUpdate({
      id: new ObjectId(req.params.id),
    }, {
      $set: req.body,
    }, {
      returnDocument: 'after',
    });
    if (!result) {
      throw new Error(`Todo with Id "${req.params.id}" not found`);
    }
    res.json(result);
  } catch (err) {
    console.log('error', err);
    next(err);  
  }
}

export async function deleteById(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
  try {
    const result = await Todos.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (err) {
    console.log('error', err);
    next(err); 
  } 
}