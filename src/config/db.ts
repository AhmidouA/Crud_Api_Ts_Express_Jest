// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoClient } from 'mongodb';

console.log(process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost/todo-api';

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
