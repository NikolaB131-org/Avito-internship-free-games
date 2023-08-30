import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';

function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(`time: ${new Date().toLocaleString('ru')}\n`, err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).send(err.message);
    return;
  }

  res.status(500).send('Что-то пошло не так'); // произошла ошибка которую мы не ожидали
}

export default errorHandler;
